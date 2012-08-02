###
  src_file: ../src/taste_mapper/taste_mapper.js.coffee
###
window.main_lib_name = window.main_lib_name or {}
((taste_mapper, d3, $) ->
  
  width = undefined
  height = width / 2
  radius = width / 2
  circumferal_x_axis = d3.scale.linear().range([0, 2 * Math.PI])
  radial_y_axis = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius])
  padding = undefined
  animation_interval = undefined
  base_div = undefined
  base_vis = undefined
  partition = undefined
  arc = undefined
  data_path = undefined
  nodes = undefined
  path = undefined
  text = undefined
  text_enter = undefined
  
  ###
    Base Config Initialization functions
  ###
  
  taste_mapper.init = (div, width_in, animation_interval_in, padding_in, data_path_in) ->
    width_in ?= 840
    animation_interval_in ?= 1000
    padding_in ?= 5
    div ?= '#vis'
    data_path_in ?= "wheel.json"
    
    width = width_in
    animation_interval = animation_interval_in
    padding = padding_in
    data_path = data_path_in
    base_div = d3.select div
    div.select('img').remove()
    base_vis = init_svg()
    init_instructions()
    partition = init_partitions()
    arc = init_arc()
    d3.json data_path, json_handler
    
  init_svg = ->
    base_div.append("svg")
        .attr("width", width + padding * 2)
        .attr("height", height + padding * 2)
        .append("g")
        .attr("transform", "translate(#{radius + padding},#{radius + padding})")
  
  init_instructions = ->
    base_div.append("p")
        .attr("id", "intro")
        .attr("Click to zoom!")
        
  init_partitions = ->
    d3.layout.partition()
        .sort(null)
        .value(depth_sort_function)
        
  depth_sort_function = (layer_data) ->
    5.8 - layer_data.depth
    
  init_arc = ->
    d3.svg.arc()
    .startAngle(angle_start_handler)
    .endAngle(angle_end_handler)
    .innerRadius(radius_inner_handler)
    .outerRadius(radius_outer_handler)
    
  angle_start_handler = (d) ->
    Math.max( 0, Math.min(2 * Math.PI, x(d.x)))
    
  angle_end_handler = (d) ->
    Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)))
    
  radius_inner_handler = (d) ->
    Math.max(0, if d.y then y(d.y) else d.y)
  
  radius_outer_handler = (d) ->
    Math.max(0, y(d.y + d.dy))
  
  ###
    Context Setup Functions
  ###
  
  context_init = ->
    init_path()
    init_text()
    
  init_path = ->
    path = base_vis.selectAll("path").data(nodes)
    path.enter()
      .append('path')
      .attr("id", (d, i) -> "path-" + i)
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", colour)
      .on("click", click_handler);
  
  init_text = ->
    text = base_vis.selectAll("text").data(nodes)
    text_enter = text.enter()
      .append('text')
      .style('fill', text_fill_handler)
      .attr('text-anchor', text_anchor_handler)
      .attr('dy', '.2em')
      .attr('transform', transform_handler)
      .on('click', click_handler)
    text_enter.append('tspan')
      .attr('x', 0)
      .text(tspan_one_handler)
    text_enter.append('tspan')
      .attr('x', 0)
      .attr('dy', '1em')
      .text(text_two_handler)
      
  tspan_one_handler = (d) ->
    if d.depth then d.name.split(' ')[0] else ''
    
  tspan_two_handler = (d) ->
    if d.depth then d.name.split(' ')[1] || '' else ''
  
  text_fill_handler = (d) ->
    if brightness(d3.rgb(colour(d))) < 125 then '#eee' else '#000'
  
  text_anchor_handler = (d) ->
    if x(d.x + d.dx / 2) > Math.PI then 'end' else 'start'
  
  transform_handler = (d) ->
    multiline = (d.name || '').split(' ').length > 1
    angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90
    rotate = angle + (if multiline then -0.5 else 0)
    "rotate(#{rotate})translate(#{y(d.y) + p#})rotate(#{if angle > 90 then -180 else 0})"
  
  ###
    meat functions
  ###
  
  json_handler = (json) ->
    nodes = partition.nodes children: json
    context_init()
  
  click_handler = (d) ->
    path.transition()
      .duration(duration)
      .attrTween('d', arc_tween(d))
          
    text.style('visibility', (e) ->
      d3.select(this).style('visibility'))
        .transition()
        .duraction(duration)
        .attrTween('text-anchor', text_tween_handler_generator)
        .attrTween('transform', transform_tween_handler_generator)
        .style('fill-opacity', 
          (e) -> is_parent_of(d, e) ? 1 : 1e-6)
        .each('end', (e) ->
          d3.select(this).style('visibility', if is_parent_of(d, e) then null else 'hidden')
        ) unless is_parent_of(d, e)
      
  text_tween_handler_generator = (d) ->
    -> 
      x(d.x + d.dx / 2 ) > Math.PI > 'end' : 'start'
      
  transform_tween_handler_generator = (d) ->
    multiline = (d.name || '').split(' ').length > 1
    ->
      angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90
      rotate = angle + (if multline then -0.5 else 0)
      "rotate(#{rotate})translate(#{y(d.y) + padding})rotate(#{if angle > 90 then -180 else 0})"
  
  ###
    helper functions (maybe put in external luma.utility object)
  ###
  
  is_parent_of = (parent, child) ->
    if parent is child
      true
    else if parent.children
      parent.children.some (d) -> 
        is_parent_of d, child
    else
      false
    
  colour = (d) ->
    if d.children
      colours = d.children.map(colour)
      a = d3.hsl(colours[0])
      b = d3.hsl(colours[1])
      d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2)
    else
      d.colour || '#fff'
      
  arc_tween = (d) ->
    my = max_y(d)
    xd = d3.interpolate x.domain(), [d.x, d.x + d.dx]
    yd = d3.interpolate y.domain(), [d.y, my]
    yr = d3.interpolate y.range(), [(if d.y then 20 else 0), radius]
  
  max_y = (d) ->
    if d.children then Math.max.apply(Math, d.children.map(max_y)) else d.y + d.dy
    
  brightness = (rgb) ->
    rgb.r * .299 + rgb.g * .587 + rgb.b * .114
    
) window.main_lib_name.taste_mapper = window.main_lib_name.taste_mapper or {}, d3, jQuery
###
  src_file: ../src/taste_mapper/init.js.coffee
###
$ ->
  window.luma.taste_mapper.init 'div_selector', 840, 1000, 5, 'wheel.json'
###
  src_file: ../src/init.js.coffee
###
 
