window.main_lib_name = window.main_lib_name or {}
((sunburst, d3, $) ->
  ###
    data vars
  ###
  
  width = undefined
  height = undefined
  radius = undefined
  path = undefined
  json = undefined
  anim_duration = undefined
  
  ###
    internal vars
  ###
  
  color = undefined
  vis = undefined
  partition = undefined
  arc = undefined
  
  ###
    Config Init and Helpers
  ###
  
  sunburst.init = (selector) ->
    selector ?= 'sunburst'
    elem = $(".#{selector}[data-initialized=false]").first()
    init_seed_vars elem
    init_controls elem
    init_vis elem
    init_partition()
    init_arc()
    d3.json json, context_init
    elem.attr 'data-initialized', true 
  
  init_controls = (elem) ->
    d3.select("##{elem.attr 'id'}")
      .append("button")
      .attr("class", 'first active')
      .attr("id", 'count')
      .html('Count')
    d3.select("##{elem.attr 'id'}")
      .append("button")
      .attr("class", 'last')
      .attr("id", 'size')
      .html('Size')
  
  init_seed_vars = (elem) ->
    width = elem.data 'width'
    height = elem.data 'height'
    json = elem.data 'json'
    anim_duration = elem.data 'anim_duration'
    radius = (Math.min width, height) / 2
    color = d3.scale.category20c()
  
  init_arc = ->
    arc =d3.svg.arc()
      .startAngle((d) -> d.x)
      .endAngle((d) -> d.x + d.dx)
      .innerRadius((d) -> Math.sqrt d.y)
      .outerRadius (d) -> Math.sqrt d.y + d.dy
  
  init_partition = ->
    partition = d3.layout.partition()
      .sort(null)
      .size([2 * Math.PI, radius * radius])
      .value (d) -> 1
      
  init_vis = (elem) ->
    vis = d3.select("##{elem.attr 'id'}")
      .append("svg")
      .attr("width", elem.data('width'))
      .attr("height", elem.data('height'))
      .append("g")
      .attr "transform", "translate(#{width / 2},#{height / 2})"
  
  ###
    Context Init Helpers
  ###
  
  init_path = (json) ->
    path = vis.data(json)
      .selectAll("path")
      .data(partition.nodes)
      .enter()
      .append("path")
      .attr("display", (d) ->
        if d.depth then null else "none")
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("stroke", "#fff")
      .style("fill", (d) ->
        color (if d.children then d else d.parent).name)
      .each stash
  
  control_init = ->
    d3.select("#size").on "click", size_click_handler
    d3.select("#count").on "click", count_click_handler
  
  context_init = (json) ->
    init_path [json]
    control_init()
  
  ###
    Event Handlers
  ###
    
  size_click_handler = ->
    path.data(partition.value size_calculation_handler)
      .transition()
      .duration(anim_duration)
      .attrTween "d", arc_tween
    d3.select("#size") 
      .classed "active", true
    d3.select("#count") 
      .classed "active", false
    
  count_click_handler = ->
    path.data(partition.value count_calculation_handler)
      .transition()
      .duration(anim_duration)
      .attrTween "d", arc_tween
    d3.select("#size") 
      .classed "active", false
    d3.select("#count") 
      .classed "active", true
    
  size_calculation_handler = (d) ->
    d.size
    
  count_calculation_handler = (d) ->
    1
  
  ###
    Utility Functions
  ###
  
  stash = (d) ->
    d.x0 = d.x
    d.dx0 = d.dx
  
  arc_tween = (a) ->
    i = d3.interpolate
      x: a.x0
      dx: a.dx0
    , a
    (t) ->
      b = i t
      a.x0 = b.x
      a.dx0 = b.dx
      arc b
      
) window.main_lib_name.sunburst = window.main_lib_name.sunburst or {}, d3, jQuery
