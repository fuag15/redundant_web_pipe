window.main_lib_name = window.main_lib_name or {}
((sunburst, d3, $) ->
  width = 960
  height = 700
  radius = Math.min(width, height) / 2
  color = d3.scale.category20c()
  vis = undefined
  partition = undefined
  arc = undefined
  path = undefined
  
  ###
    Config Init and Helpers
  ###
  
  sunburst.init = ->
    init_vis()
    init_partition()
    init_arc()
    d3.json "./data/flare.json", context_init
  
  init_arc = ->
    arc =d3.svg.arc().startAngle((d) ->
      d.x
    ).endAngle((d) ->
      d.x + d.dx
    ).innerRadius((d) ->
      Math.sqrt d.y
    ).outerRadius((d) ->
      Math.sqrt d.y + d.dy
    )
  
  init_partition = ->
    partition = d3.layout.partition()
      .sort(null)
      .size([2 * Math.PI, radius * radius])
      .value((d) ->
        1
      )
      
  init_vis = ->
    vis = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(#{width / 2},#{height / 2})")
  
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
        (if d.depth then null else "none")
      ).attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("stroke", "#fff")
      .style("fill", (d) ->
        color ((if d.children then d else d.parent)).name
      ).each(stash)
  
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
    .duration(1500)
    .attrTween "d", arcTween
    d3.select("#size").classed "active", true
    d3.select("#count").classed "active", false
    
  count_click_handler = ->
    path.data(partition.value count_calculation_handler)
    .transition()
    .duration(1500)
    .attrTween "d", arcTween
    d3.select("#size").classed "active", false
    d3.select("#count").classed "active", true
    
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
  
  arcTween = (a) ->
    i = d3.interpolate(
      x: a.x0
      dx: a.dx0
    , a)
    (t) ->
      b = i(t)
      a.x0 = b.x
      a.dx0 = b.dx
      arc b
      
) window.main_lib_name.sunburst = window.main_lib_name.sunburst or {}, d3, jQuery
