const width = 5;
const height = width;
const areas = [1,2,3,4,5,6,7,8,9,10,11,12];
const pattern_values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
const model_values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const grids = [".grid-1", ".grid-2", ".grid-3", ".overlay"];

var oldX = 5;
var oldY = 5;

// Draw Instance Circles
var svg = d3.select("#instance-1")
          .append("svg")
          .attr("width", 80)
          .attr("height", 160)
          .attr('viewBox', '0 0 80 160')
          .attr('display', 'block');
svg.append("circle")
  .attr("cx", "40")
  .attr("cy", "80")
  .attr("r", "35")
  .attr("fill", "LightGray")
  .attr("stroke", "Gray")
  .attr("stroke-width", "2")
svg.append("text")
  .attr("x", "50%")
  .attr("y", "50%")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("class", "heavy")
  .text("i1")

var svg = d3.select("#instance-2")
          .append("svg")
          .attr("width", 80)
          .attr("height", 160)
          .attr('viewBox', '0 0 80 160')
          .attr('display', 'block');
svg.append("circle")
  .attr("cx", "40")
  .attr("cy", "80")
  .attr("r", "35")
  .attr("fill", "LightGray")
  .attr("stroke", "Gray")
  .attr("stroke-width", "2")
svg.append("text")
  .attr("x", "50%")
  .attr("y", "50%")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("class", "heavy")
  .text("i2")

var svg = d3.select("#instance-3")
          .append("svg")
          .attr("width", 80)
          .attr("height", 160)
          .attr('viewBox', '0 0 80 160')
          .attr('display', 'block');
svg.append("circle")
  .attr("cx", "40")
  .attr("cy", "80")
  .attr("r", "35")
  .attr("fill", "LightGray")
  .attr("stroke", "Gray")
  .attr("stroke-width", "2")
svg.append("text")
  .attr("x", "50%")
  .attr("y", "50%")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("class", "heavy")
  .text("i3")

var svg = d3.select("#overlay")
          .append("svg")
          .attr("width", 80)
          .attr("height", 160)
          .attr('viewBox', '0 0 80 160')
          .attr('display', 'block');
svg.append("circle")
  .attr("cx", "40")
  .attr("cy", "80")
  .attr("r", "35")
  .attr("fill", "LightGray")
  .attr("stroke", "Gray")
  .attr("stroke-width", "2")
svg.append("text")
  .attr("x", "50%")
  .attr("y", "50%")
  .attr("text-anchor", "middle")
  .attr("class", "heavy-ish")
  .text("Over")
svg.append("text")
  .attr("x", "50%")
  .attr("y", "50%")
  .attr("dy", "20pt")
  .attr("text-anchor", "middle")
  .attr("class", "heavy-ish")
  .text("lay")

d3.tsv("/assets/CAbyinstance_data_2ktt4ktt.txt").then( function(data, model="M01",
                               type="con50sc",
                               trainingtrials="4000tt",
                               pattern="P01") {
    for (var grid_idx = 0; grid_idx < grids.length; grid_idx++) {
      var grid_class = grids[grid_idx];
      for (var area_num = 0; area_num < areas.length; area_num++) {
        // Put svg in appropriate area
        var area_id = String("#area" + areas[area_num] + grid_class);
        var svg = d3.select(area_id)
                    .append("svg")
                    .attr("width", 160)
                    .attr("height", 160)
                    .attr('viewBox', '0 0 160 160') // scale w CSS
                    .attr('display', 'block');
        svg.append("rect")
            .attr("width", 160)
            .attr("height", 160)
            .attr("fill", "#404040")
            .attr("class", "background");
        // Read data
        var data_subset = data.filter(function(d) {
          return (d.AreaAbs == areas[area_num]
                   && d.Model == model
                   && d.Type == type
                   && d.TrainingTrials == trainingtrials
                   && d.Pattern3i == pattern)});
        var CA = data_subset[0].CAi_1.split('#').map(Number);

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
               .attr("id", "cell" + String(cellID))
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
} // END for grid class
);  // END d3.tsv

function updateCA(area_id, CA) {
  svg = d3.select(area_id).select('svg');
  // reset all active cells
  svg.selectAll("rect.cell.CA")
    .attr("fill", "Gray")
    .attr("class", "cell nonCA");
  // and draw only the active ones
  for (var i = 0; i < CA.data.length; i++) {
    if (CA.data[i]) {
      var cellID = String(CA.data[i]);
      var col = String(CA.color);
      svg.select("rect#cell" + cellID)
        .attr("fill", col)
        .attr("class", "cell CA")
    }
  }
};

// Monitor inputs
document.getElementById('training_time_select').onchange = changeInput;
document.getElementById('type_select').onchange = changeInput;
document.getElementById('pattern_select').oninput = changeInput;
document.getElementById('model_select').oninput = changeInput;

function grid2column(data_subset, grid_class) {
  switch (grid_class) {
    case ".grid-1": {
      const CA = {
        data: data_subset[0].CAi_1.split('#'),
        color: "#f62621"
      };
      return CA;}
    case ".grid-2": {
      const CA = {
        data: data_subset[0].CAi_2.split('#'),
        color: "#368fd8"
      };
      return CA;}
    case ".grid-3": {
      const CA = {
        data: data_subset[0].CAi_3.split('#'),
        color: "#08aa53"
      };
      return CA;}
    case ".overlay": {
      cell_array = data_subset[0].CAi_1.split('#').concat(
      data_subset[0].CAi_2.split('#'),
      data_subset[0].CAi_3.split('#'),
      data_subset[0].CAi_1_2.split('#'),
      data_subset[0].CAi_1_3.split('#'),
      data_subset[0].CAi_2_3.split('#'),
      data_subset[0].CAi_1_2_3.split('#'));
      const CA = {
        data: cell_array,
        color: "#fff"
      }
      return CA;}
    default:
      console.log("Wrong grid_class!");
      break;
  }
};



function changeInput() {
  // Fetch all current settings
  var trainingtrials = document.getElementById('training_time_select').value;
  var type = document.getElementById('type_select').value;
  var pattern = "P" + pattern_values[document.getElementById('pattern_select').value];
  var model = "M" + model_values[document.getElementById('model_select').value];

  // get new_CAs for each area
  d3.tsv("/assets/CAbyinstance_data_2ktt4ktt.txt").then( function(data) {
    // Go through all grids ...
    for (var grid_idx = 0; grid_idx < grids.length; grid_idx++) {
      var grid_class = grids[grid_idx];
      for (var area_num = 0; area_num < areas.length; area_num++) {
        // Put svg in appropriate area
        var area_id = String("#area" + areas[area_num] + grid_class);
        // filter data by condition
        var data_subset = data.filter(function(d) {
          return (d.AreaAbs == areas[area_num]
                   && d.Model == model
                   && d.Type == type
                   && d.TrainingTrials == trainingtrials
                   && d.Pattern3i == pattern)});
        var new_CA = grid2column(data_subset, grid_class);
        // make results new CA - pass color map here?
        updateCA(area_id, new_CA);
      } // END areas
    } // END grid_class
      document.getElementById('pattern_output').innerHTML = "C" + pattern.slice(1);
      document.getElementById('model_output').innerHTML = model;
    }) // END then
};
document.getElementById('training_time_select').onchange();
document.getElementById('type_select').onchange();
document.getElementById('pattern_select').oninput();
document.getElementById('model_select').oninput();
