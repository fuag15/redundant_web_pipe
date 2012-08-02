
/*
  src_file: ../src/taste_mapper/taste_mapper.js.coffee
*/


(function() {

  window.main_lib_name = window.main_lib_name || {};

  (function(taste_mapper, d3, $) {
    var angle_end_handler, angle_start_handler, animation_interval, arc, arc_tween, base_div, base_vis, brightness, circumferal_x_axis, click_handler, colour, context_init, data_path, depth_sort_function, height, init_arc, init_instructions, init_partitions, init_path, init_svg, init_text, is_parent_of, json_handler, max_y, nodes, padding, partition, path, radial_y_axis, radius, radius_inner_handler, radius_outer_handler, text, text_anchor_handler, text_enter, text_fill_handler, text_tween_handler_generator, transform_handler, transform_tween_handler_generator, tspan_one_handler, tspan_two_handler, width;
    width = void 0;
    height = width / 2;
    radius = width / 2;
    circumferal_x_axis = d3.scale.linear().range([0, 2 * Math.PI]);
    radial_y_axis = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]);
    padding = void 0;
    animation_interval = void 0;
    base_div = void 0;
    base_vis = void 0;
    partition = void 0;
    arc = void 0;
    data_path = void 0;
    nodes = void 0;
    path = void 0;
    text = void 0;
    text_enter = void 0;
    /*
        Base Config Initialization functions
    */

    taste_mapper.init = function(div, width_in, animation_interval_in, padding_in, data_path_in) {
      if (width_in == null) {
        width_in = 840;
      }
      if (animation_interval_in == null) {
        animation_interval_in = 1000;
      }
      if (padding_in == null) {
        padding_in = 5;
      }
      if (div == null) {
        div = '#vis';
      }
      if (data_path_in == null) {
        data_path_in = "wheel.json";
      }
      width = width_in;
      animation_interval = animation_interval_in;
      padding = padding_in;
      data_path = data_path_in;
      base_div = d3.select(div);
      div.select('img').remove();
      base_vis = init_svg();
      init_instructions();
      partition = init_partitions();
      arc = init_arc();
      return d3.json(data_path, json_handler);
    };
    init_svg = function() {
      return base_div.append("svg").attr("width", width + padding * 2).attr("height", height + padding * 2).append("g").attr("transform", "translate(" + (radius + padding) + "," + (radius + padding) + ")");
    };
    init_instructions = function() {
      return base_div.append("p").attr("id", "intro").attr("Click to zoom!");
    };
    init_partitions = function() {
      return d3.layout.partition().sort(null).value(depth_sort_function);
    };
    depth_sort_function = function(layer_data) {
      return 5.8 - layer_data.depth;
    };
    init_arc = function() {
      return d3.svg.arc().startAngle(angle_start_handler).endAngle(angle_end_handler).innerRadius(radius_inner_handler).outerRadius(radius_outer_handler);
    };
    angle_start_handler = function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
    };
    angle_end_handler = function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
    };
    radius_inner_handler = function(d) {
      return Math.max(0, d.y ? y(d.y) : d.y);
    };
    radius_outer_handler = function(d) {
      return Math.max(0, y(d.y + d.dy));
    };
    /*
        Context Setup Functions
    */

    context_init = function() {
      init_path();
      return init_text();
    };
    init_path = function() {
      path = base_vis.selectAll("path").data(nodes);
      return path.enter().append('path').attr("id", function(d, i) {
        return "path-" + i;
      }).attr("d", arc).attr("fill-rule", "evenodd").style("fill", colour).on("click", click_handler);
    };
    init_text = function() {
      text = base_vis.selectAll("text").data(nodes);
      text_enter = text.enter().append('text').style('fill', text_fill_handler).attr('text-anchor', text_anchor_handler).attr('dy', '.2em').attr('transform', transform_handler).on('click', click_handler);
      text_enter.append('tspan').attr('x', 0).text(tspan_one_handler);
      return text_enter.append('tspan').attr('x', 0).attr('dy', '1em').text(text_two_handler);
    };
    tspan_one_handler = function(d) {
      if (d.depth) {
        return d.name.split(' ')[0];
      } else {
        return '';
      }
    };
    tspan_two_handler = function(d) {
      if (d.depth) {
        return d.name.split(' ')[1] || '';
      } else {
        return '';
      }
    };
    text_fill_handler = function(d) {
      if (brightness(d3.rgb(colour(d))) < 125) {
        return '#eee';
      } else {
        return '#000';
      }
    };
    text_anchor_handler = function(d) {
      if (x(d.x + d.dx / 2) > Math.PI) {
        return 'end';
      } else {
        return 'start';
      }
    };
    transform_handler = function(d) {
      var angle, multiline, rotate;
      multiline = (d.name || '').split(' ').length > 1;
      angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90;
      rotate = angle + (multiline ? -0.5 : 0);
      return "rotate(" + rotate + ")translate(" + (y(d.y) + p) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
    };
    /*
        meat functions
    */

    json_handler = function(json) {
      nodes = partition.nodes({
        children: json
      });
      return context_init();
    };
    click_handler = function(d) {
      path.transition().duration(duration).attrTween('d', arc_tween(d));
      if (!is_parent_of(d, e)) {
        return text.style('visibility', function(e) {
          return d3.select(this).style('visibility');
        }).transition().duraction(duration).attrTween('text-anchor', text_tween_handler_generator).attrTween('transform', transform_tween_handler_generator).style('fill-opacity', function(e) {
          var _ref;
          return (_ref = is_parent_of(d, e)) != null ? _ref : {
            1: 1e-6
          };
        }).each('end', function(e) {
          return d3.select(this).style('visibility', is_parent_of(d, e) ? null : 'hidden');
        });
      }
    };
    text_tween_handler_generator = function(d) {
      return function() {
        var _ref;
        return (x(d.x + d.dx / 2) > (_ref = Math.PI) && _ref > {
          'end': 'start'
        });
      };
    };
    transform_tween_handler_generator = function(d) {
      var multiline;
      multiline = (d.name || '').split(' ').length > 1;
      return function() {
        var angle, rotate;
        angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90;
        rotate = angle + (multline ? -0.5 : 0);
        return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
      };
    };
    /*
        helper functions (maybe put in external luma.utility object)
    */

    is_parent_of = function(parent, child) {
      if (parent === child) {
        return true;
      } else if (parent.children) {
        return parent.children.some(function(d) {
          return is_parent_of(d, child);
        });
      } else {
        return false;
      }
    };
    colour = function(d) {
      var a, b, colours;
      if (d.children) {
        colours = d.children.map(colour);
        a = d3.hsl(colours[0]);
        b = d3.hsl(colours[1]);
        return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
      } else {
        return d.colour || '#fff';
      }
    };
    arc_tween = function(d) {
      var my, xd, yd, yr;
      my = max_y(d);
      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]);
      yd = d3.interpolate(y.domain(), [d.y, my]);
      return yr = d3.interpolate(y.range(), [(d.y ? 20 : 0), radius]);
    };
    max_y = function(d) {
      if (d.children) {
        return Math.max.apply(Math, d.children.map(max_y));
      } else {
        return d.y + d.dy;
      }
    };
    return brightness = function(rgb) {
      return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
    };
  })(window.main_lib_name.taste_mapper = window.main_lib_name.taste_mapper || {}, d3, jQuery);

  /*
    src_file: ../src/taste_mapper/init.js.coffee
  */


  $(function() {
    return window.luma.taste_mapper.init('div_selector', 840, 1000, 5, 'wheel.json');
  });

  /*
    src_file: ../src/init.js.coffee
  */


}).call(this);
