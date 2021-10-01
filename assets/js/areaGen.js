//TODO: maybe d3js join logic can speed this up

//POLYFILL: no Object.entries
if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

let areas = [1,2,3,4,5,6,7,8,9,10,11,12];
let pattern_values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
let model_values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let grids = [".grid-1", ".grid-2", ".grid-3", ".overlay"];



const color_palette = {
  background: "LightGray",
  nonCA: "white",
  i_1: "#f62621",
  i_2: "#368fd8",
  i_3: "#08aa53",
  i_1_2: "#ec03db",
  i_1_3: "#e6e203",
  i_2_3: "#4cf6fa",
  i_1_2_3: "black",
};

function palette_picker(tab_num) {
  var palette = document.querySelector(tab_num + ' #palette_select').value;
  d3.selectAll(".background")
    .attr("class", "background " + palette)

  d3.selectAll(".nonCA")
    .attr("class", "cell nonCA " + palette)

  d3.selectAll(".i_1")
    .attr("class", "cell CA i_1 " + palette)
  d3.selectAll(".i_2")
    .attr("class", "cell CA i_2 " + palette)
  d3.selectAll(".i_3")
    .attr("class", "cell CA i_3 " + palette)
  d3.selectAll(".i_1_2")
    .attr("class", "cell CA i_1_2 " + palette)
  d3.selectAll(".i_1_3")
    .attr("class", "cell CA i_1_3 " + palette)
  d3.selectAll(".i_2_3")
    .attr("class", "cell CA i_2_3 " + palette)
  d3.selectAll(".i_1_2_3")
    .attr("class", "cell CA i_1_2_3 " + palette)
}
palette_picker('.tab1');
palette_picker('.tab2');

// Sync palette pickers
var state1 = document.querySelector('.tab1 #palette_select');
var state2 = document.querySelector('.tab2 #palette_select');

state1.onchange = function(e) {
    state2.value = e.target.value;
    palette_picker('.tab1');
};
state2.onchange = function(e) {
    state1.value = e.target.value;
    palette_picker('.tab1');
};

function toggleMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

function drawPaletteTriangle(tab){
  var width = 180;
  var height = width;
  var radius = 15;
  var x_i_1 = width/2;
  var y_i_1 = radius;
  var x_i_2 = width-radius;
  var y_i_2 = height-radius;
  var x_i_3 = radius;
  var y_i_3 = y_i_2;
  var x_i_1_2 = width*3/4;
  var y_i_1_2 = height/2;
  var x_i_1_3 = width/4;
  var y_i_1_3 = y_i_1_2;
  var x_i_2_3 = x_i_1;
  var y_i_2_3 = y_i_2;
  var x_i_1_2_3 = x_i_1;
  var y_i_1_2_3 = height/2+radius;

  var target = tab + " #palette";
  var svg = d3.select(target)
              .append("svg")
              // .attr("width", width)
              // .attr("height", height)
              .attr('viewBox', '0 0 230 230')
              .attr('display', 'block')
              .attr('class', 'palette')
              .attr("transform", "rotate(45) translate(0,0)");

  // Connecty lines
  svg.append("line") //i1-i1_3
     .attr("x1", x_i_1)
     .attr("y1", y_i_1)
     .attr("x2", x_i_1_3)
     .attr("y2", y_i_1_3)
     .attr("stroke", "LightGray")
  svg.append("line")  //i1_3-i3
     .attr("x1", x_i_1_3)
     .attr("y1", y_i_1_3)
     .attr("x2", x_i_3)
     .attr("y2", y_i_3)
     .attr("stroke", "LightGray")
   svg.append("line")
      .attr("x1", x_i_3)
      .attr("y1", y_i_3)
      .attr("x2", x_i_2_3)
      .attr("y2", y_i_2_3)
      .attr("stroke", "LightGray")
   svg.append("line")
      .attr("x1", x_i_2_3)
      .attr("y1", y_i_2_3)
      .attr("x2", x_i_2)
      .attr("y2", y_i_2)
      .attr("stroke", "LightGray")
    svg.append("line")
       .attr("x1", x_i_2)
       .attr("y1", y_i_2)
       .attr("x2", x_i_1_2)
       .attr("y2", y_i_1_2)
       .attr("stroke", "LightGray")
    svg.append("line")
       .attr("x1", x_i_1_2)
       .attr("y1", y_i_1_2)
       .attr("x2", x_i_1)
       .attr("y2",  y_i_1)
       .attr("stroke", "LightGray")
     svg.append("line") //i1-all
        .attr("x1", x_i_1)
        .attr("y1", y_i_1)
        .attr("x2", x_i_1_2_3)
        .attr("y2", y_i_1_2_3)
        .attr("stroke", "LightGray")
      svg.append("line") //i3-all
         .attr("x1", x_i_3)
         .attr("y1", y_i_3)
         .attr("x2", x_i_1_2_3)
         .attr("y2", y_i_1_2_3)
         .attr("stroke", "LightGray")
     svg.append("line") //i2-all
        .attr("x1", x_i_2)
        .attr("y1", y_i_2)
        .attr("x2", x_i_1_2_3)
        .attr("y2", y_i_1_2_3)
        .attr("stroke", "LightGray")

  // Primary instances
  svg.append("circle")
     .attr("cx", x_i_1)
     .attr("cy", y_i_1)
     .attr("r", radius)
     .attr("fill", "red")
     .attr("class", "i_1")
   svg.append("circle")
      .attr("cx", x_i_3)
      .attr("cy", y_i_3)
      .attr("r", radius)
      .attr("fill", "green")
      .attr("class", "i_3")
    svg.append("circle")
       .attr("cx", x_i_2)
       .attr("cy", y_i_2)
       .attr("r", radius)
       .attr("fill", "blue")
       .attr("class", "i_2")
   // Combined instances
   svg.append("circle")
      .attr("cx", x_i_1_3)
      .attr("cy", y_i_1_3)
      .attr("r", radius)
      .attr("fill", "yellow")
      .attr("class", "i_1_3")
   svg.append("circle")
      .attr("cx", x_i_1_2)
      .attr("cy", y_i_1_2)
      .attr("r", radius)
      .attr("fill", "pink")
      .attr("class", "i_1_2")
   svg.append("circle")
      .attr("cx", x_i_2_3)
      .attr("cy", y_i_2_3)
      .attr("r", radius)
      .attr("fill", "cyan")
      .attr("class", "i_2_3")
   // all three instances
   svg.append("circle")
      .attr("cx", x_i_1_2_3)
      .attr("cy", y_i_1_2_3)
      .attr("r", radius)
      .attr("fill", "black")
      .attr("class", "i_1_2_3")

    // LABELS
    svg.append("text")
      .attr("x", x_i_1+radius+8)
      .attr("y", y_i_1)
      .attr("fill", "Gray")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("class", "heavy-ish")
      .text("i1")
    svg.append("text")
       .attr("x", x_i_3)
       .attr("y", y_i_3+radius+9)
       .attr("r", radius)
       .attr("fill", "Gray")
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "middle")
       .attr("class", "heavy-ish")
       .text("i3")
     svg.append("text")
        .attr("x", x_i_2)
        .attr("y", y_i_2+radius+9)
        .attr("r", radius)
        .attr("fill", "Gray")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("class", "heavy-ish")
        .text("i2")
    // Combined instances
    svg.append("text")
       .attr("x", x_i_1_3)
       .attr("y", y_i_1_3-radius-5)
       .attr("r", radius)
       .attr("fill", "Gray")
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "middle")
       .attr("transform", "rotate(310, " + x_i_1_3 + ", " + y_i_1_3 + ")")
       .attr("class", "heavy-ish")
       .html("i3 &middot;	i1")
    svg.append("text")
       .attr("x", x_i_1_2)
       .attr("y", y_i_1_2-radius-5)
       .attr("r", radius)
       .attr("fill", "Gray")
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "middle")
       .attr("transform", "rotate(50, " + x_i_1_2 + ", " + y_i_1_2 + ")")
       .attr("class", "heavy-ish")
       .html("i1 &middot;	i2")
    svg.append("text")
       .attr("x", x_i_2_3)
       .attr("y", y_i_2_3+radius+7)
       .attr("r", radius)
       .attr("fill", "Gray")
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "middle")
       .attr("class", "heavy-ish")
       .html("i3 &middot;	i2")
}
drawPaletteTriangle(".tab1");
drawPaletteTriangle(".tab2");


/*** Initializing svgs on website ***/
function drawInstance(tab_num, instance_id) {
  /*Draws instance identifier circle*/
  var tab_sel = tab_num + " " + instance_id;
  var width = 60;
  var height = width;
  var cx = width/2;
  var cy = height/2;
  var r = width/2 - 1;

  var svg = d3.select(tab_sel)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            // .attr('viewBox', '0 0 60 60')
            .attr('display', 'block');
  svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", r)
    .attr("fill", "LightGray")
    .attr("stroke", "Gray")
    .attr("stroke-width", "2")
  if (instance_id != "#overlay") {
    svg.append("text")
      .attr("x", cx)
      .attr("y", cy)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("class", "heavy")
      .text(instance_id.slice(1,2) + instance_id.slice(-1))
  } else {
    svg.append("text")
      .attr("x", cx)
      .attr("y", cy)
      .attr("text-anchor", "middle")
      .attr("class", "heavy-ish")
      .text("Over")
    svg.append("text")
      .attr("x", cx)
      .attr("y", cy)
      .attr("dy", "15pt")
      .attr("text-anchor", "middle")
      .attr("class", "heavy-ish")
      .text("lay")
  }
};

function drawInitGrid(tab_num, area_id, grid_class) {
  /*Draws deactivated neuron grid in specified div*/
  var area_sel = tab_num + " " + area_id + grid_class;

  var functional_area = document.querySelector(area_id + ">p").innerHTML;

  // create a tooltip
  // var Tooltip = d3.select(area_sel)
  //   .append("div")
  //   .style("opacity", 0)
  //   .attr("class", "tooltip")
  //   .style("background-color", "white")
  //   .style("border", "solid")
  //   .style("border-width", "2px")
  //   .style("border-radius", "5px")
  //   // .style("height", "0px")
  //   .style("padding", "5px")
  //   .style("position", "relative")
  //   // .style("display", "inline-block")
  //   .style("z", "900")
  //   .style("text-align", "center");

  // Init svg
  var svg = d3.select(area_sel)
              .append("svg")
              .attr("width", 160)
              .attr("height", 160)
              .attr('viewBox', '0 0 160 160') // scale w CSS
              .attr('display', 'block');




  // svg.on("mouseover", function(d) {
  //     Tooltip
  //       .style("opacity", 1)
  //     // d3.select(this)
  //     //   .style("opacity", 0.8)
  //   })
  //   .on("mousemove", function(d) {
  //     // console.log(d3.pointer(event));
  //     Tooltip
  //       .html(functional_area)
  //       .style("left", (d3.pointer(event)[0]) + "px")
  //       .style("top", (d3.pointer(event)[1]) + "px")
  //   })
  //   .on("mouseleave", function(d) {
  //       Tooltip
  //         .style("opacity", 0)
  //       d3.select(this)
  //         .style("opacity", 1)
  //     });


  // Draw background
  svg.append("rect")
      .attr("width", 160)
      .attr("height", 160)
      .attr("fill", color_palette.background)
      .attr("class", "background");
  // Draw cells
  let margin_left = 5;
  let margin_top = 5;
  let width = 5;
  let height = width;

  for (var i = 0; i < 25; i++) {
    for (var j = 0; j < 25; j++) {
      newX = margin_left + (width*j + 1*j);
      newY = margin_top + (height*i + 1*i);
      cellID = j + i*25 + 1;
      svg.append("rect")
         .attr("x", String(newX))
         .attr("y", String(newY))
         .attr("width", String(width))
         .attr("height", String(height))
         .attr("id", "cell" + String(cellID))
         .attr("fill", color_palette.nonCA)
         .attr("class", "cell nonCA")
    } // END j
  } // END i

  svg.append("title") // TITLE APPENDED HERE
  .html(functional_area);
}

function drawInitGrids(grids, areas) {
  /*Draws deactivated neuron grid in all appropriate divs*/
  for (var grid_idx = 0; grid_idx < grids.length; grid_idx++) {
    var grid_class = grids[grid_idx];
    for (var area_num = 0; area_num < areas.length; area_num++) {
      // Put svg in appropriate area
      var tab_num = ".tab1";
      var area_id = String("#area" + areas[area_num]);
      drawInitGrid(tab_num, area_id, grid_class);
      tab_num = ".tab2";
      drawInitGrid(tab_num, area_id, grid_class);
      // Print content of area div - hoping to attach to svg in background!
      // console.log(document.querySelector(area_id).textContent);
  } // END for area number
  } // END grid class
}

/*** Updating grids with active neuron IDs ***/

function updateCA(area_id, CA, palette) {
  /*Updates drawing of active neurons in area_id.*/
  svg = d3.select(area_id).select('svg');
  // reset all active cells
  svg.selectAll("rect.cell.CA")
    // .attr("fill", color_palette.nonCA)
    .attr("class", "cell nonCA " + palette);
  // and draw only the active ones
  for (const [instance, value] of Object.entries(CA)) {
    for (var i = 0; i < value.data.length; i++) {
      if (value.data[i]) {
        var cellID = String(value.data[i]);
        // var col = String(value.color);
        svg.select("rect#cell" + cellID)
          // .attr("fill", value.color)
          .attr("class", "cell CA " + value.origin + " " + palette)
      } // END if
    }// END for i, data
  } // END for object entries
}

function grid2column(data_subset, grid_class) {
  /*Converts grid_class into appropriate instance CA + color*/
  // const CA = {
  //   i_1: {data: i_1, color:"#f62621", origin: "i_1"},
  //   i_2: {data: i_2, color:"#368fd8", origin: "i_2"},
  //   i_3: {data: i_3, color:"#08aa53", origin: "i_3"},
  //   i_1_2: {data: i_1_2, color:"#ec03db", origin: "i_1_2"},
  //   i_1_3: {data: i_1_3, color:"#e6e203", origin: "i_1_3"},
  //   i_2_3: {data: i_2_3, color:"#4cf6fa", origin: "i_2_3"},
  //   i_1_2_3: {data: i_1_2_3, color:"#000", origin: "i_1_2_3"},
  // };

  var i_1 = data_subset[0].CAi_1.split('#');
  var i_2 = data_subset[0].CAi_2.split('#');
  var i_3 = data_subset[0].CAi_3.split('#');
  var i_1_2 = data_subset[0].CAi_1_2.split('#');
  var i_1_3 = data_subset[0].CAi_1_3.split('#');
  var i_2_3 = data_subset[0].CAi_2_3.split('#');
  var i_1_2_3 = data_subset[0].CAi_1_2_3.split('#');

  switch (grid_class) {
    case ".grid-1": {
      const CA = {
        i_1: {data: i_1, color: color_palette.i_1, origin: "i_1"},
        i_2: {data: [], color: color_palette.i_2, origin: "i_2"},
        i_3: {data: [], color: color_palette.i_3, origin: "i_3"},
        i_1_2: {data: i_1_2, color: color_palette.i_1_2, origin: "i_1_2"},
        i_1_3: {data: i_1_3, color: color_palette.i_1_3, origin: "i_1_3"},
        i_2_3: {data: [], color: color_palette.i_2_3, origin: "i_2_3"},
        i_1_2_3: {data: i_1_2_3, color: color_palette.i_1_2_3, origin: "i_1_2_3"},
      };
      return CA;}
    case ".grid-2": {
      const CA = {
        i_1: {data: [], color: color_palette.i_1, origin: "i_1"},
        i_2: {data: i_2, color: color_palette.i_2, origin: "i_2"},
        i_3: {data: [], color: color_palette.i_3, origin: "i_3"},
        i_1_2: {data: i_1_2, color: color_palette.i_1_2, origin: "i_1_2"},
        i_1_3: {data: [], color: color_palette.i_1_3, origin: "i_1_3"},
        i_2_3: {data: i_2_3, color: color_palette.i_2_3, origin: "i_2_3"},
        i_1_2_3: {data: i_1_2_3, color: color_palette.i_1_2_3, origin: "i_1_2_3"},
      };
      return CA;}
    case ".grid-3": {
      const CA = {
        i_1: {data: [], color: color_palette.i_1, origin: "i_1"},
        i_2: {data: [], color: color_palette.i_2, origin: "i_2"},
        i_3: {data: i_3, color: color_palette.i_3, origin: "i_3"},
        i_1_2: {data: [], color: color_palette.i_1_2, origin: "i_1_2"},
        i_1_3: {data: i_1_3, color: color_palette.i_1_3, origin: "i_1_3"},
        i_2_3: {data: i_2_3, color: color_palette.i_2_3, origin: "i_2_3"},
        i_1_2_3: {data: i_1_2_3, color: color_palette.i_1_2_3, origin: "i_1_2_3"},
      };
      return CA;}
    case ".overlay": {
      const CA = {
        i_1: {data: i_1, color: color_palette.i_1, origin: "i_1"},
        i_2: {data: i_2, color: color_palette.i_2, origin: "i_2"},
        i_3: {data: i_3, color: color_palette.i_3, origin: "i_3"},
        i_1_2: {data: i_1_2, color: color_palette.i_1_2, origin: "i_1_2"},
        i_1_3: {data: i_1_3, color: color_palette.i_1_3, origin: "i_1_3"},
        i_2_3: {data: i_2_3, color: color_palette.i_2_3, origin: "i_2_3"},
        i_1_2_3: {data: i_1_2_3, color: color_palette.i_1_2_3, origin: "i_1_2_3"},
      };
      return CA;}
    default:
      console.error("Wrong grid_class!");
      break;
  }
}

function getUserValues(tab_num) {
  /*Gets current arrangement of user selected values.*/
  //NOTE: type_select is deprecated with the tab design
  return {
    // trainingtrials: document.getElementById('training_time_select').value,
    trainingtrials: document.querySelector(tab_num + ' #training_time_select').value,
    pattern: "P" + pattern_values[document.querySelector(tab_num + ' #pattern_select').value],
    model:"M" + model_values[document.querySelector(tab_num + ' #model_select').value],
    palette: document.querySelector(tab_num + ' #palette_select').value,
  };
}

function changeTab(tab_num) {
  // Update color_palette
  // palette_picker();
  // Fetch all current settings
  var metadata = getUserValues(tab_num);
  var type = (tab_num === ".tab1") ? "con50sc" : "pair33sc";

  // get new_CAs for each area
  d3.tsv("/assets/CAbyinstance_data_2ktt4ktt.txt").then( function(data) {
    for (var grid_idx = 0; grid_idx < grids.length; grid_idx++) {
      var grid_class = grids[grid_idx];
      for (var area_num = 0; area_num < areas.length; area_num++) {
        // Put svg in appropriate area
        var area_id = String("#area" + areas[area_num]);
        var area_sel = tab_num + " " + area_id + grid_class;
        // filter data by condition
        var data_subset = data.filter(function(d) {
          return (d.AreaAbs == areas[area_num]
                   && d.Model == metadata.model
                   && d.Type == type
                   && d.TrainingTrials == metadata.trainingtrials
                   && d.Pattern3i == metadata.pattern)});
        var new_CA = grid2column(data_subset, grid_class);
        // make results new CA - pass color map here?
        updateCA(area_sel, new_CA, metadata.palette);
      } // END areas
    } // END grid_class
      document.querySelector(tab_num + ' #pattern_output').innerHTML = "C" + metadata.pattern.slice(1);
      document.querySelector(tab_num + ' #model_output').innerHTML = metadata.model;
    }) // END then
    // palette_picker();
};

/*** DRAWING ***/
//TODO: grab all .instance divs and drawInstance their IDs for an automatic, scalable solution
drawInstance(".tab1", "#instance-1");
drawInstance(".tab1", "#instance-2");
drawInstance(".tab1", "#instance-3");
drawInstance(".tab1", "#overlay");

drawInstance(".tab2", "#instance-1");
drawInstance(".tab2", "#instance-2");
drawInstance(".tab2", "#instance-3");
drawInstance(".tab2", "#overlay");

drawInitGrids(grids, areas);

// Load initial default CAs - P01, M01
changeTab(".tab1");
changeTab(".tab2");
