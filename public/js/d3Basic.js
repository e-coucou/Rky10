(function () {
  'use strict';

  angular.module('RkyApp.directives')
    .directive('d3Bars', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            svg.selectAll("*").remove();

            // setup variables
            var width, height, max;
            width = d3.select(iElement[0])[0][0].offsetWidth - 20;
              // 20 is for margins and can be changed
            height = scope.data.length * 35;
              // 35 = 30(bar height) + 5(margin between bars)
            max = 98;
              // this can also be found dynamically when the data is not static
              // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("height", 30) // height of each bar
                .attr("width", 0) // initial width of 0 for transition
                .attr("x", 10) // half of the 20 side margin specified above
                .attr("y", function(d, i){
                  return i * 35;
                }) // height + margin between bars
                .transition()
                  .duration(1000) // time of duration
                  .attr("width", function(d){
                    return d.value/(max/width);
                  }); // width based on scale

            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("fill", "#fff")
                .attr("y", function(d, i){return i * 35 + 22;})
                .attr("x", 15)
                .text(function(d){return d[scope.label];});

          };
        }
      };
    }]);

}());

// -- by e-Coucou

(function () {
  'use strict';

  angular.module('RkyApp.directives')
    .directive('d3Lines', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );
    
          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){

            // setup variables
            var width, height, max,maxi, min,mini;
            var padding = 1;

            // accessor 
            function x(d,i) { return i * (width / data.length);}
            function y(d) { return (height - (d.value-min)/((max-min)/height)); }
            function h(d) { return ((d.value-min)/((max-min)/height));}

            // fonction
            function info(d,i) {
              label.text(Math.round(d.value*100)/100) ;
              var datac = [ { "x" : x(d,i), "y" : 0 }, { "x" : x(d,i), "y" : height } ];
              d3.selectAll(".curseur").remove();
              svg.append("path")
                .datum(datac)
                .attr("class", "curseur")
                .attr("d", curseur);
              }
            // remove all previous items before render
            svg.selectAll("*").remove();

            height = d3.select(iElement[0])[0][0].offsetWidth - 20;
              // 20 is for margins and can be changed
            width = 800 ;//scope.data.length * 35;
            height = 300 ;
            if (data.length > 700 ) { padding = 0; } // no padding si trop de data
            maxi = Math.max.apply(Math, data.map(function(x) {return x.value; }));
            mini = Math.min.apply(Math, data.map(function(x) {return x.value; }));
            console.log("max: ",maxi,"min: ",mini);

            max = maxi + 0.03 * (maxi-mini);
            min = mini - 0.20 * (maxi-mini);

            // set the height based on the calculations above
            svg.attr('height', height)
               .attr('width',  width);

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width)
    .text('VALEUR');               

var curseur = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

var repere_min = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

var repere_max = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

var moyenne = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

            //create the rectangles for the bar chart
            svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .on("mouseover",function (d,i) { return info(d,i);})
                .attr("height", 0) // height of each bar
                .attr("width", width / data.length - padding)
                .attr("x", function(d,i) { return x(d, i);})  // height + margin between bars
                .attr("fill","yellow")
                .transition()
                  .duration(3000) // time of duration
                  .attr("stroke-width",0)
                  .attr("fill", function(d) {
                    var val = ((d.value -min)/((max-min)/16));
                    return "rgb(0, 0, " + val*16 + ")"; 
                    })
                  .attr("height", function (d) { return h(d); }) // half of the 20 side margin specified above
                  .attr("y", function (d) { return y(d);}); // width based on scale

            // position des repères
            var datac = [ { "x" : 0, "y" : height }, { "x" : width, "y" : height } ];
            console.log(datac);
            d3.selectAll(".repere_min").remove();
            svg.append("path")
              .datum(datac)
              .attr("class", "repere")
              .attr("d", repere_min);

            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("fill", "#fff")
                .attr("y", function(d, i){return i * 35 + 22;})
                .attr("x", 15)
                .text(function(d){return d[scope.label];});

          };
        }
      };
    }]);

}());