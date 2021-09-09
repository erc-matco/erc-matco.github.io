const width = 5;
const height = width;
const areas = [1,2,3,4,5,6,7,8,9,10,11,12];

var oldX = 5;
var oldY = 5;

d3.tsv("/assets/sample_data_ts_thresh_CAs.txt").then( function(data, model="M01",
                               type="con50sc",
                               trainingtrials="4000tt",
                               pattern="P01") {
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
      var data_subset = data.filter(function(d) {
        return (d.AreaAbs == areas[area_num]
                 && d.Model == model
                 && d.Type == type
                 && d.TrainingTrials == trainingtrials
                 && d.Pattern == pattern)});
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
                 return "cell CA";
               }
               return "cell nonCA";
             })
        } // END j
      } // END i
  } // END for area number
} // END function(data)
);  // END d3.tsv

function updateCA(area_id, CA) {
  svg = d3.select(area_id).select('svg');
  svg.selectAll("rect.cell") // check all cells
     .attr("fill", function (d) { // is in CA?
        if (CA.includes(this.id)) {
          return "LightGray";
        }
        return "Gray";
      })
     .attr("class", function (d) { // is in CA?
        if (CA.includes(this.id)) {
          return "cell CA";
        }
        return "cell nonCA";
      })
};

// Monitor inputs
document.getElementById('training_time_select').onchange = changeInput;
document.getElementById('type_select').onchange = changeInput;
document.getElementById('pattern_select').oninput = changeInput;
document.getElementById('model_select').oninput = changeInput;

function changeInput() {
  const values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
  // Fetch all current settings
  var trainingtrials = document.getElementById('training_time_select').value;
  var type = document.getElementById('type_select').value;
  var pattern = "P" + values[document.getElementById('pattern_select').value];
  var model = "M" + values[document.getElementById('model_select').value];
  // get new_CAs for each area
  d3.tsv("/assets/sample_data_ts_thresh_CAs.txt").then( function(data) {
      for (var area_num = 0; area_num < areas.length; area_num++) {
        // Put svg in appropriate area
        var area_id = String("#area" + areas[area_num]);
        // filter data by condition
        // Read data
        var data_subset = data.filter(function(d) {
          return (d.AreaAbs == areas[area_num]
                   && d.Model == model
                   && d.Type == type
                   && d.TrainingTrials == trainingtrials
                   && d.Pattern == pattern)});
        var new_CA = data_subset[0].CA.split('#');
        // make results new CA
        updateCA(area_id, new_CA);
      } // END areas
      document.getElementById('pattern_output').innerHTML = pattern;
      document.getElementById('model_output').innerHTML = model;
    }) // END then
};
document.getElementById('training_time_select').onchange();
document.getElementById('type_select').onchange();
document.getElementById('pattern_select').oninput();
document.getElementById('model_select').oninput();
