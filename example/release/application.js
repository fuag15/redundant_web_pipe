(function(){window.main_lib_name=window.main_lib_name||{};(function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;y=void 0;k=void 0;u=void 0;t=void 0;r=void 0;d=void 0;g=void 0;x=void 0;s=void 0;e=void 0;a.init=function(a){var d;if(a==null)a='sunburst';d=c("."+a+"[data-initialized=false]").first();p(d);m(d);q(d);n();l();b.json(r,h);return d.attr('data-initialized',true);};m=function(a){b.select("#"+(a.attr('id'))).append("button").attr("class",'first active').attr("id",'count').html('Count');return b.select("#"+(a.attr('id'))).append("button").attr("class",'last').attr("id",'size').html('Size');};p=function(a){y=a.data('width');k=a.data('height');r=a.data('json');d=a.data('anim_duration');u=(Math.min(y,k))/2;return g=b.scale.category20c();};l=function(){return e=b.svg.arc().startAngle(function(a){return a.x;}).endAngle(function(a){return a.x+a.dx;}).innerRadius(function(a){return Math.sqrt(a.y);}).outerRadius(function(a){return Math.sqrt(a.y+a.dy);});};n=function(){return s=b.layout.partition().sort(null).size([2*Math.PI,u*u]).value(function(a){return 1;});};q=function(a){return x=b.select("#"+(a.attr('id'))).append("svg").attr("width",a.data('width')).attr("height",a.data('height')).append("g").attr("transform","translate("+(y/2)+","+(k/2)+")");};o=function(a){return t=x.data(a).selectAll("path").data(s.nodes).enter().append("path").attr("display",function(a){if(a.depth)return null;else return "none";}).attr("d",e).attr("fill-rule","evenodd").style("stroke","#fff").style("fill",function(a){return g((a.children?a:a.parent).name);}).each(w);};i=function(){b.select("#size").on("click",v);return b.select("#count").on("click",j);};h=function(a){o([a]);return i();};v=function(){t.data(s.value(function(a){return a.size;})).transition().duration(d).attrTween("d",f);b.select("#size").classed("active",true);return b.select("#count").classed("active",false);};j=function(){t.data(s.value(function(a){return 1;})).transition().duration(d).attrTween("d",f);b.select("#size").classed("active",false);return b.select("#count").classed("active",true);};w=function(a){a.x0=a.x;return a.dx0=a.dx;};return f=function(a){var c;c=b.interpolate({x:a.x0,dx:a.dx0},a);return function(b){var d;d=c(b);a.x0=d.x;a.dx0=d.dx;return e(d);};};})(window.main_lib_name.sunburst=window.main_lib_name.sunburst||{},d3,jQuery);$(function(){return window.main_lib_name.sunburst.init();});}).call(this);