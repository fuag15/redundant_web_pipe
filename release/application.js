(function(){window.main_lib_name=window.main_lib_name||{};(function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;w=960;k=700;r=Math.min(w,k)/2;f=b.scale.category20c();v=void 0;p=void 0;d=void 0;q=void 0;a.init=function(){o();m();l();return b.json("./data/flare.json",g);};l=function(){return d=b.svg.arc().startAngle(function(a){return a.x;}).endAngle(function(a){return a.x+a.dx;}).innerRadius(function(a){return Math.sqrt(a.y);}).outerRadius(function(a){return Math.sqrt(a.y+a.dy);});};m=function(){return p=b.layout.partition().sort(null).size([2*Math.PI,r*r]).value(function(a){return 1;});};o=function(){return v=b.select("#chart").append("svg").attr("width",w).attr("height",k).append("g").attr("transform","translate("+(w/2)+","+(k/2)+")");};n=function(a){return q=v.data(a).selectAll("path").data(p.nodes).enter().append("path").attr("display",function(a){if(a.depth)return null;else return "none";}).attr("d",d).attr("fill-rule","evenodd").style("stroke","#fff").style("fill",function(a){return f((a.children?a:a.parent).name);}).each(u);};h=function(){b.select("#size").on("click",t);return b.select("#count").on("click",j);};g=function(a){n([a]);return h();};t=function(){q.data(p.value(s)).transition().duration(1500).attrTween("d",e);b.select("#size").classed("active",true);return b.select("#count").classed("active",false);};j=function(){q.data(p.value(i)).transition().duration(1500).attrTween("d",e);b.select("#size").classed("active",false);return b.select("#count").classed("active",true);};s=function(a){return a.size;};i=function(a){return 1;};u=function(a){a.x0=a.x;return a.dx0=a.dx;};return e=function(a){var c;c=b.interpolate({x:a.x0,dx:a.dx0},a);return function(b){var e;e=c(b);a.x0=e.x;a.dx0=e.dx;return d(e);};};})(window.main_lib_name.sunburst=window.main_lib_name.sunburst||{},d3,jQuery);$(function(){return window.main_lib_name.sunburst.init();});}).call(this);