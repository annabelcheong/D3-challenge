/////////////////////////////////////////////////
////////// Core Assignment: D3 Dabbler //////////
/////////////////////////////////////////////////


// - Create a scatter plot between two of the data variables such as 
//   Healthcare (y-axis)  vs. Poverty (x-axis) or Smokers vs. Age.
//     - Each state is represented by a circle element in the scatterplot. Include state abbreviations in the circles.
//     - Create and situate your axes and labels to the left and bottom of the chart.

// Chosen Scatterplot: Healthcare (y-axis)  vs. Poverty (x-axis)

// Function 'makeResponsive' which automatically resizes the chart when window is resized
function makeResponsive(){

  // Clear svg if it is not empty in the html body
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

// SVG wrapper dimensions are determined by the current width and
// height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  //////// CHART DIMENSIONS AND LOCATION IN HTML CODE ////////

  //// [OPTIONAL for when function makeResponsive is not implemented.] ////
  // Define SVG area dimensions 
  // var svgWidth = 960;
  // var svgHeight = 500;
  ////////

  // Define the chart's margins as an object
  var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;

  // Select in index.html, <div id="scatter">, append SVG area to it, and set its dimensions
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append a group area, then set its margins
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
  //////// DATA SOURCE (CSV FILE) ////////

  // Load data from data.csv
  d3.csv("./data/data.csv").then((personData) => {
  

      // View data on console log
      console.log(personData); // 51 array. Each array contains 19 objects.

      // TEST TO CONSOLE LOG FOR EACH PERSON ID, THE POVERTY VALUE (x-axis), THE HEALTHCARE VALUE (y-axis)
      // Attain the poverty values in the objects (i.e. for each person id)
      personData.forEach((obj) => {
      console.log(obj.poverty);
      console.log(obj.healthcare);
      });

      // Parse data
      personData.forEach((d)=> {
          d.poverty = +d.poverty;
          d.healthcare = +d.healthcare;
      });


      ////////// SCALE FOR CHART WIDTH AND CHART HEIGHT FOR AXES AND DRAWLINE FUNCTION (based on data) //////////

      // Configure a time scale with a range between 0 and the chartWidth
      // Set the domain for the xLinearScale function
      // d3.extent returns the an array containing the min and max values for the property specified
      var xLinearScale = d3.scaleLinear()
      .range([0, chartWidth])
      .domain(d3.extent(personData, d => d.poverty));

      // Configure a linear scale with a range between the chartHeight and 0
      // Set the domain for the yLinearScale function
      var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(personData, d => d.healthcare)]);

      // Create two new functions passing the scales in as arguments
      // These will be used to create the chart's axes
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      // append x axis
      var xAxis = chartGroup.append("g")
          .attr("transform", `translate(0, ${chartHeight})`)
          .call(bottomAxis);

      // append y axis
      chartGroup.append("g")
      .call(leftAxis);

      // append circles
      var circlesGroup = chartGroup.selectAll("circle")
      .data(personData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 15)
      .attr("class","stateCircle")
      .attr("opacity", ".5");

      // append text (state abbreviation) into circles
      var circlesText = chartGroup.selectAll("circleText")
      .data(personData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare)+5)
      .text(d=> (d.abbr))
      .attr("font-size","15px")
      .attr("class", "stateText");
    
      // append x axis label
      chartGroup.append("text")
      .attr("x", chartWidth/2)
      .attr("y", chartHeight + 40)   
      .text("In Poverty (%)")
      .attr("class", "aText")
      .attr("font-weight","700");


      // append y axis label
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10) //x-coord location
      .attr("x", 0 - (chartHeight - chartHeight/3)) //y-coord location 
      .attr("dy", "1em")
      .text("Lacks Healthcare (%)")
      .attr("font-weight","700");

  });

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);