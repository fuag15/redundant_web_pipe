
/*
  src_file: ../src/sunburst/sunburst.js.coffee
*/


(function() {

  window.main_lib_name = window.main_lib_name || {};

  (function(sunburst, d3, $) {
    var arc, arcTween, color, context_init, control_init, count_calculation_handler, count_click_handler, height, init_arc, init_partition, init_path, init_vis, partition, path, radius, size_calculation_handler, size_click_handler, stash, vis, width;
    width = 960;
    height = 700;
    radius = Math.min(width, height) / 2;
    color = d3.scale.category20c();
    vis = void 0;
    partition = void 0;
    arc = void 0;
    path = void 0;
    /*
        Config Init and Helpers
    */

    sunburst.init = function() {
      init_vis();
      init_partition();
      init_arc();
      return d3.json("./data/flare.json", context_init);
    };
    init_arc = function() {
      return arc = d3.svg.arc().startAngle(function(d) {
        return d.x;
      }).endAngle(function(d) {
        return d.x + d.dx;
      }).innerRadius(function(d) {
        return Math.sqrt(d.y);
      }).outerRadius(function(d) {
        return Math.sqrt(d.y + d.dy);
      });
    };
    init_partition = function() {
      return partition = d3.layout.partition().sort(null).size([2 * Math.PI, radius * radius]).value(function(d) {
        return 1;
      });
    };
    init_vis = function() {
      return vis = d3.select("#chart").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
    };
    /*
        Context Init Helpers
    */

    init_path = function(json) {
      return path = vis.data(json).selectAll("path").data(partition.nodes).enter().append("path").attr("display", function(d) {
        if (d.depth) {
          return null;
        } else {
          return "none";
        }
      }).attr("d", arc).attr("fill-rule", "evenodd").style("stroke", "#fff").style("fill", function(d) {
        return color((d.children ? d : d.parent).name);
      }).each(stash);
    };
    control_init = function() {
      d3.select("#size").on("click", size_click_handler);
      return d3.select("#count").on("click", count_click_handler);
    };
    context_init = function(json) {
      init_path([json]);
      return control_init();
    };
    /*
        Event Handlers
    */

    size_click_handler = function() {
      path.data(partition.value(size_calculation_handler)).transition().duration(1500).attrTween("d", arcTween);
      d3.select("#size").classed("active", true);
      return d3.select("#count").classed("active", false);
    };
    count_click_handler = function() {
      path.data(partition.value(count_calculation_handler)).transition().duration(1500).attrTween("d", arcTween);
      d3.select("#size").classed("active", false);
      return d3.select("#count").classed("active", true);
    };
    size_calculation_handler = function(d) {
      return d.size;
    };
    count_calculation_handler = function(d) {
      return 1;
    };
    /*
        Utility Functions
    */

    stash = function(d) {
      d.x0 = d.x;
      return d.dx0 = d.dx;
    };
    return arcTween = function(a) {
      var i;
      i = d3.interpolate({
        x: a.x0,
        dx: a.dx0
      }, a);
      return function(t) {
        var b;
        b = i(t);
        a.x0 = b.x;
        a.dx0 = b.dx;
        return arc(b);
      };
    };
  })(window.main_lib_name.sunburst = window.main_lib_name.sunburst || {}, d3, jQuery);

  /*
    src_file: ../src/sunburst/init.js.coffee
  */


  $(function() {
    return window.main_lib_name.sunburst.init();
  });

  /*
    src_file: ../src/init.js.coffee
  */


}).call(this);
