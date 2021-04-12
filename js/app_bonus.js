////////////////////////////////////////////////////////
////////// Bonus Assignment: Impress the Boss //////////
////////////////////////////////////////////////////////

// CORE REQUIREMENTS //
// - Create a scatter plot between two of the data variables such as 
//   Healthcare (y-axis)  vs. Poverty (x-axis) or Smokers vs. Age.
//     - Each state is represented by a circle element in the scatterplot. Include state abbreviations in the circles.
//     - Create and situate your axes and labels to the left and bottom of the chart.

// Chosen Scatterplot: Healthcare (y-axis)  vs. Poverty (x-axis)

// BONUS REQUIREMENTS //
/// PT 1: 
// - Place additional labels in your scatter plot and 
// give them click events so that your users can decide which data to display.
// - Scatter plot and give them click events so that your users can decide which data to display. 
// - Animate the transitions for your circles' locations as well as the range of your axes. 
// - Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.
/// PT 2: Incorporate d3-tip
// Add tooltips to your circles and display each tooltip with the data 
// that the user has selected.

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
  
  // Initial Paramenters
  var chosenXAxis = "poverty"
  var chosenYAxis = "healthcare"

  // Function used for updating x-scale upon click of x-label 
  function xScale(personData, chosenXAxis){
    // Create Scales
    var xLinearScale = d3.scaleLinear()
      .range([0, chartWidth])
      .domain(d3.extent(personData, d => d[chosenXAxis]));
    
      return xLinearScale;

  }

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
          // X-axis variables
          d.poverty = +d.poverty;
          d.age = +d.age;
          d.income = +d.income;
          // Y-axis variables
          d.healthcare = +d.healthcare;
          d.smokes = +d.smokes;
          d.obesity = +d.obesity;
      });


      ////////// SCALE FOR CHART WIDTH AND CHART HEIGHT FOR AXES AND DRAWLINE FUNCTION (based on data) //////////

      // Configure a time scale with a range between 0 and the chartWidth
      // Set the domain for the xLinearScale function
      // d3.extent returns the an array containing the min and max values for the property specified
      
      // REMOVE FOLLOWING AS IS DEPENDENT ON FUNCTION 'xScale'
      // var xLinearScale = d3.scaleLinear()
      // .range([0, chartWidth])
      // .domain(d3.extent(personData, d => d.poverty));

      // xLinearScale: Call in function xScale
      var xLinearScale = xScale(hairData, chosenXAxis);

      // Configure a linear scale with a range between the chartHeight and 0
      // Set the domain for the yLinearScale function
      // yLinearScale
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
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 15)
      .attr("class","stateCircle")
      .attr("opacity", ".5");

      // append text (state abbreviation) into circles
      var circlesText = chartGroup.selectAll("circleText")
      .data(personData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d.healthcare)+5)
      .text(d=> (d.abbr))
      .attr("font-size","15px")
      .attr("class", "stateText");
    
      //////////////////////////
      //// append x axis and y axis label
      //////////////////////////
      // Create group for 3 x-axis labels (poverty, age, income)
      // Overall Location of labels
      var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height +20})`);

      //X-Axis Label Groups
      var povertyLabel = labelsGroup.append("text")
        .attr("x,",0)
        .attr("y",10)
        .attr("value","poverty") // Value to grab for event listener
        .classed("active", true)
        .text("In Poverty (%)");

      var ageLabel = labelsGroup.append("text")
        .attr("x",0)
        .attr("y",20)
        .attr("value","age") // Value to grab for event listener
        .classed("inactive", true)
        .text("Age (Median)");

      var incomeLabel = labelsGroup.append("text")
        .attr("x",0)
        .attr("y",30)
        .attr("value","income") // Value to grab for event listener
        .classed("inactive", true)
        .text("Household Income (Median)");

      // REMOVE FOLLOWING (THIS CODE PROVIDES NO SELECTION OPTION FOR X-AXIS)
      // chartGroup.append("text")
      // .attr("x", chartWidth/2)
      // .attr("y", chartHeight + 40)   
      // .text("In Poverty (%)")
      // .attr("class", "aText")
      // .attr("font-weight","700");


      //// append y axis label
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10) //x-coord location
      .attr("x", 0 - (chartHeight - chartHeight/3)) //y-coord location 
      .attr("dy", "1em")
      .text("Lacks Healthcare (%)")
      .attr("font-weight","700");

       //////////////////////////
      //// EVENT LISTENER for x-axis and y-axis labels 
      //////////////////////////

      labelsGroup.selectAll("text").on("click", function(){
        // Get value of selection
        var value = d3.select(this).attr("value")

        // if value does not equal ChosenXAxis, do the following
        if (value !== chosenXAxis) {

          // Replace chosenXAxis with value
          chosenXAxis = value;

          // Updates x scale with selected data
          xLinearScale=xScale(personData, chosenXAxis);

          // Updates x-axis with transition 
          // *Calls function renderAxes be used
          xAxis renderAxes(xLinearScale,xAxis);

          // Update circles with new x-values
          // *Calls function renderCircles be used
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

          // Update circles with new x-values (state abbr)
          // *Calls function renderCirclesText be used
          circlesText = renderCirclesText(circlesText, xLinearScale, chosenXAxis);

          // Change classes when chosenXAxis is selected. 
          // Class 'active' has bold text
          if (chosenXAxis === "poverty"){
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
            ageLabel 
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }

          if (chosenXAxis === "age"){
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel 
              .classed("active", true)
              .classed("inactive", false);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }

          if (chosenXAxis === "income"){
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel 
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);
          }

        }


      });




  });

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);