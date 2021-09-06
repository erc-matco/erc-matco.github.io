const width = 5;
const height = width;
const areas = [1,2,3,4,5,6,7,8,9,10,11,12];

var oldX = 5;
var oldY = 5;



d3.tsv("/assets/sample_data.tsv").then( function(data) {
    for (var area_num = 0; area_num < areas.length; area_num++) {
      // Put svg in appropriate area
      var area_id = String("#area" + areas[area_num]);
      var svg = d3.select(area_id)
                  .append("svg")
                  .attr("width", 160)
                  .attr("height", 160)
                  .attr('viewBox', '0 0 160 160') // scale w CSS
                  .attr('display', 'block');
      svg.append("rect")
          .attr("width", 160)
          .attr("height", 160)
          .attr("fill", "black")
          .attr("class", "background");

      // Read data
      var data_subset = data.filter(function(d) { return d.AreaAbs == areas[area_num]});
      var CA = data_subset[0].CA.split('#').map(Number);

      // Draw individual cells
      // fill and class changes according to
      // whether they're in the data cell assembly
      for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {
          newX = oldX + (width*j + 1*j);
          newY = oldY + (height*i + 1*i);
          cellID = j + i*25 + 1;
          svg.append("rect")
             .attr("x", String(newX))
             .attr("y", String(newY))
             .attr("width", String(width))
             .attr("height", String(height))
             .attr("id", String(cellID))
             .attr("fill", function (d) { // is in CA?
               if (CA.includes(cellID)) {
                 return "LightGray";
               }
               return "Gray";
             })
             .attr("class", function (d) { // is in CA?
               if (CA.includes(cellID)) {
                 return "CA";
               }
               return "nonCA";
             })
        } // END j
      } // END i
  } // END for area number
} // END function(data)
);  // END d3.tsv
