/////////////////////////////////////////////////
////////// Core Assignment: D3 Dabbler //////////
/////////////////////////////////////////////////


// - Create a scatter plot between two of the data variables such as 
//   Healthcare (y-axis)  vs. Poverty (x-axis) or Smokers vs. Age.
//     - Each state is represented by a circle element in the scatterplot. Include state abbreviations in the circles.
//     - Create and situate your axes and labels to the left and bottom of the chart.

// Chosen Scatterplot: Healthcare (y-axis)  vs. Poverty (x-axis)


//////// CHART DIMENSIONS AND LOCATION IN HTML CODE ////////

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

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

    // Object.entries(personData).forEach(([key, value]) => {
    //     console.log(key, value);
    // });

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

    // Configure a drawLine function which will use the scales to plot the line's points
    // var drawLine = d3
    // .line()
    // .x(d => xTimeScale(d.poverty))
    // .y(d => yLinearScale(d.healthcare));

    // append x axis
    var xAxis = chartGroup.append("g")
        // .classed("x-axis", true)
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
    .attr("fill", "pink")
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
    .attr("text-anchor","middle")
    .attr("fill","darkgreen");
   
    // append y axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight - chartHeight/3))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)");





});