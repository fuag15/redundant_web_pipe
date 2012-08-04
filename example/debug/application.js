
/*
  src_file: ../src/sunburst/sunburst.js.coffee
*/


(function() {

  window.main_lib_name = window.main_lib_name || {};

  (function(sunburst, d3, $) {
    /*
        data vars
    */

    var anim_duration, arc, arc_tween, color, context_init, control_init, count_calculation_handler, count_click_handler, height, init_arc, init_controls, init_partition, init_path, init_seed_vars, init_vis, json, partition, path, radius, size_calculation_handler, size_click_handler, stash, vis, width;
    width = void 0;
    height = void 0;
    radius = void 0;
    path = void 0;
    json = void 0;
    anim_duration = void 0;
    /*
        internal vars
    */

    color = void 0;
    vis = void 0;
    partition = void 0;
    arc = void 0;
    /*
        Config Init and Helpers
    */

    sunburst.init = function(selector) {
      var elem;
      if (selector == null) {
        selector = 'sunburst';
      }
      elem = $("." + selector + "[data-initialized=false]").first();
      init_seed_vars(elem);
      init_controls(elem);
      init_vis(elem);
      init_partition();
      init_arc();
      d3.json(json, context_init);
      return elem.attr('data-initialized', true);
    };
    init_controls = function(elem) {
      d3.select("#" + (elem.attr('id'))).append("button").attr("class", 'first active').attr("id", 'count').html('Count');
      return d3.select("#" + (elem.attr('id'))).append("button").attr("class", 'last').attr("id", 'size').html('Size');
    };
    init_seed_vars = function(elem) {
      width = elem.data('width');
      height = elem.data('height');
      json = elem.data('json');
      anim_duration = elem.data('anim_duration');
      radius = (Math.min(width, height)) / 2;
      return color = d3.scale.category20c();
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
    init_vis = function(elem) {
      return vis = d3.select("#" + (elem.attr('id'))).append("svg").attr("width", elem.data('width')).attr("height", elem.data('height')).append("g").attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
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
      path.data(partition.value(size_calculation_handler)).transition().duration(anim_duration).attrTween("d", arc_tween);
      d3.select("#size").classed("active", true);
      return d3.select("#count").classed("active", false);
    };
    count_click_handler = function() {
      path.data(partition.value(count_calculation_handler)).transition().duration(anim_duration).attrTween("d", arc_tween);
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
    return arc_tween = function(a) {
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
