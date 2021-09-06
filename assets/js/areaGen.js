

const width = 5;
const height = width;
var oldX = 5;
var oldY = 5;

d3.tsv("/assets/sample_data.tsv").then( function(data) {


    var svg = d3.select("#area")
                .append("svg")
                .attr("width", 160)
                .attr("height", 160)
                .attr('viewBox', '0 0 160 160')
                .attr('display', 'block');
    svg.append("rect")
        .attr("width", 160)
        .attr("height", 160)
        .attr("fill", "black")
        .attr("class", "background");

    console.log(data[0].CA);
    var CA = data[0].CA.split('#').map(Number);
    console.log(CA);
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
           .attr("fill", function (d) {
             if (CA.includes(cellID)) {
               return "LightGray";
             }
             return "Gray";
           })
           .attr("class", function (d) {
             if (CA.includes(cellID)) {
               return "CA";
             }
             return "nonCA";
           })
      } // END j
    } // END i
} // END function(data)
);  // END d3.tsv
