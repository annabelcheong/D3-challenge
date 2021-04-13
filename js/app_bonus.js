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
    right: 80,
    bottom: 100,
    left: 100
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

/////////////////////////////////////////////////////////
// X-AXIS FUNCTIONS
/////////////////////////////////////////////////////////

  ///////////////////////
  // Function used for updating X-SCALE upon click of x-label 
  //////////////////////
  function xScale(personData, chosenXAxis){
    // Create Scales
    var xLinearScale = d3.scaleLinear()
      .range([0, chartWidth])
      .domain(d3.extent(personData, d => d[chosenXAxis]));
    
      return xLinearScale;
  }

  ///////////////////////
  // Function used for updating X-AXIS upon click of x-label 
  // *Transitions: setting duration 
  //////////////////////
  function renderXAxes(newXScale, xAxis){
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
    
    return xAxis;
  }

  ///////////////////////
  // Function used for updating CIRCLES upon click of x-label 
  // *Transitions: setting duration 
  //////////////////////
  function renderXCircles(circlesGroup, newXScale, chosenXAxis){
    
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
  }

  ///////////////////////
  // Function used for updating CIRCLES TEXT (state abbr) upon click of x-label 
  // *Transitions: setting duration 
  //////////////////////
  function renderXCirclesText(circlesText, newXScale, chosenXAxis){
    
    circlesText.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]));

    return circlesText;
  }

  /////////////////////////////////////////////////////////
  // Y-AXIS FUNCTIONS
  /////////////////////////////////////////////////////////

  ///////////////////////
  // Function used for updating Y-SCALE upon click of y-label 
  //////////////////////
  function yScale(personData, chosenYAxis){
    // Create Scales
    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain(d3.extent(personData, d => d[chosenYAxis]));
    
      return yLinearScale;
  }

  ///////////////////////
  // Function used for updating Y-AXIS upon click of y-label 
  // *Transitions: setting duration 
  //////////////////////
  function renderYAxes(newYScale, yAxis){
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
    
    return yAxis;
  }

  ///////////////////////
  // Function used for updating CIRCLES upon click of y-label 
  // *Transitions: setting duration 
  //////////////////////
  function renderYCircles(circlesGroup, newYScale, chosenYAxis){
    
    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
  }

  ///////////////////////
  // Function used for updating CIRCLES TEXT (state abbr) upon click of y-label 
  // *Transitions: setting duration 
  //////////////////////
  function renderYCirclesText(circlesText, newYScale, chosenYAxis){
    
    circlesText.transition()
      .duration(1000)
      .attr("y", d => newYScale(d[chosenYAxis]));

    return circlesText;
  }

  ///////////////////////
  // Function used for tooltip when scrolling over (mouseover event) circlesGroup
  // *Transitions: setting duration 
  //////////////////////

  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesText) {

    var toolTip = d3.tip()
    .attr("class","d3-tip")
    .offset([0,0])
    .html(function(d) { 

      // X-axis labels
      var xlabel;
      console.log(chosenXAxis);
      if (chosenXAxis === "poverty") {
        xlabel = "Poverty:";
        pre_xlabelUnit = " ";
        post_xlabelUnit = "%";
      }
      
      else if (chosenXAxis === "age") {
        xlabel = "Age:";
        pre_xlabelUnit = " ";
        post_xlabelUnit = "years";
      }

      else { 
        xlabel = "Income:";
        pre_xlabelUnit = "$";
        post_xlabelUnit = "k";
      }
      
      // Y-axis labels
      var ylabel;
      console.log(chosenYAxis);
      if (chosenYAxis === "healthcare"){
        ylabel = "Healthcare:";
      }
      else if (chosenYAxis === "smokes"){
        ylabel = "Smokers:";
      }
      else {
        ylabel = "Obesity:";
      }

    // Using d3.tip() to display tooltip
    return (`<b>${d.state}</b><br>${xlabel} ${pre_xlabelUnit}${d[chosenXAxis]} ${post_xlabelUnit}<br>
      ${ylabel} ${d[chosenYAxis]} %`);

    });
  
    // CIRCLES GROUP TOOLTIP
    circlesGroup.call(toolTip);

    // TOOLTIP EVENT LISTENER (on when to show tooltip)
    // On mouseover
    circlesGroup.on("mouseover", function(data){
      toolTip.show(data);
    });
    // On mouseout
    circlesGroup.on("mouseout", function(data){
      toolTip.hide(data);
    });
  
    // CIRCLES TEXT TOOLTIP
    circlesText.call(toolTip);

    // TOOLTIP EVENT LISTENER (on when to show tooltip)
    // On mouseover
    circlesText.on("mouseover", function(data){
      toolTip.show(data);
    });
    // On mouseout
    circlesText.on("mouseout", function(data){
      toolTip.hide(data);
    });

   return circlesGroup, circlesText;
   

  




  };

  //////// DATA SOURCE (CSV FILE) ////////

  // Load data from data.csv
  d3.csv("./data/data.csv").then((personData) => {
      
      // // View data on console log
      // console.log(personData); // 51 array. Each array contains 19 objects.

      // // TEST TO CONSOLE LOG FOR EACH PERSON ID, THE POVERTY VALUE (x-axis), THE HEALTHCARE VALUE (y-axis)
      // // Attain the poverty values in the objects (i.e. for each person id)
      // personData.forEach((obj) => {
      // console.log(obj.poverty);
      // console.log(obj.healthcare);
      // });

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
      var xLinearScale = xScale(personData, chosenXAxis);

      // yLinearScale: Callin in function yScale
      var yLinearScale = yScale(personData, chosenYAxis);
   
      // Create two new functions passing the scales in as arguments
      // These will be used to create the chart's axes
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      // append x axis
      var xAxis = chartGroup.append("g")
          .classed("x-axis", true)
          .attr("transform", `translate(0, ${chartHeight})`)
          .call(bottomAxis);

      // append y axis
      var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

      // append circles
      var circlesGroup = chartGroup.selectAll("circle")
      .data(personData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("r", 15)
      .attr("class","stateCircle")
      .attr("opacity", ".5");

      // append text (state abbreviation) into circles
      var circlesText = chartGroup.selectAll("circleText")
      .data(personData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis])+5)
      .text(d=> (d.abbr))
      .attr("font-size","15px")
      .attr("class", "stateText");
    
      ////////////////////////////////////////
      // APPEND AXES LABELS
      ////////////////////////////////////////

      //////////////////////////
      //// append x axis labels
      //////////////////////////
      // Create group for 3 x-axis labels (poverty, age, income)
      // Overall Location of labels
      var xLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 40})`);

      //X-Axis Label Groups
      var povertyLabel = xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",0)
        .attr("value","poverty") // Value to grab for event listener
        .classed("active", true)
        .text("In Poverty (%)");

      var ageLabel = xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",20)
        .attr("value","age") // Value to grab for event listener
        .classed("inactive", true)
        .text("Age (Median)");

      var incomeLabel = xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",40)
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

      //////////////////////////
      //// append y axis labels
      //////////////////////////
      // Create group for 3 y-axis labels (healthcare, smokes, obese)
      // Overall Location of labels
      var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");
     
      //Y-Axis Label Groups
      var healthcareLabel = yLabelsGroup.append("text")
        .attr("x",-chartHeight/2)
        .attr("y",-80)
        .attr("value","healthcare") // Value to grab for event listener
        .classed("active", true)
        .text("Lacks Heathcare (%)");

      var smokesLabel = yLabelsGroup.append("text")
        .attr("x",-chartHeight/2)
        .attr("y",-60)
        .attr("value","smokes") // Value to grab for event listener
        .classed("inactive", true)
        .text("Smokes (%)");

      var obesityLabel = yLabelsGroup.append("text")
        .attr("x",-chartHeight/2)
        .attr("y",-40)
        .attr("value","obesity") // Value to grab for event listener
        .classed("inactive", true)
        .text("Obese (%)");

      // REMOVE FOLLOWING *THIS CODE PROVIDES NO SELECTION OPTION FOR Y-AXIS)
      // chartGroup.append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 0 - margin.left + 10) //x-coord location
      // .attr("x", 0 - (chartHeight - chartHeight/3)) //y-coord location 
      // .attr("dy", "1em")
      // .text("Lacks Healthcare (%)")
      // .attr("font-weight","700");

  
      //////// TOOLTIP ////////
      // Update the tooltip (Call function updateToolTip)
      /////////////////////////
      var circlesGroupTT = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesText);

      ////////////////////////////////////////
      // EVENT LISTENERS FOR AXES
      ////////////////////////////////////////

      //////////////////////////
      //// EVENT LISTENER for x-axis labels 
      //////////////////////////

      xLabelsGroup.selectAll("text").on("click", function(){
        // Get value of selection
        var value = d3.select(this).attr("value");

        // if value does not equal ChosenXAxis, do the following
        if (value !== chosenXAxis) {

          // Replace chosenXAxis with value
          chosenXAxis = value;

          console.log(chosenXAxis);

          // Updates x scale with selected data
          xLinearScale = xScale(personData, chosenXAxis);

          // Updates x-axis with transition 
          // *Calls function renderXAxes be used
          xAxis = renderXAxes(xLinearScale, xAxis);

          // Update circles with new x-values
          // *Calls function renderXCircles be used
          circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

          // Update circles with new x-values (state abbr)
          // *Calls function renderXCirclesText be used
          circlesText = renderXCirclesText(circlesText, xLinearScale, chosenXAxis);

          // Updates Tooltips with New Information
          circlesGroupTT = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesText);


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


      //////////////////////////
      //// EVENT LISTENER for y-axis labels 
      //////////////////////////

      yLabelsGroup.selectAll("text").on("click", function(){
        // Get value of selection
        var value = d3.select(this).attr("value");

        // if value does not equal ChosenXAxis, do the following
        if (value !== chosenYAxis) {

          // Replace chosenYAxis with value
          chosenYAxis = value;

          console.log(chosenYAxis);

          // Updates y scale with selected data
          yLinearScale = yScale(personData, chosenYAxis);

          // Updates y-axis with transition 
          // *Calls function renderYAxes be used
          yAxis = renderYAxes(yLinearScale, yAxis);

          // Update circles with new y-values
          // *Calls function renderYCircles be used
          circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

          // Update circles with new y-values (state abbr)
          // *Calls function renderYCirclesText be used
          circlesText = renderYCirclesText(circlesText, yLinearScale, chosenYAxis);

          // Updates Tooltips with New Information
          circlesGroupTT = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, circlesText);

          // Change classes when chosenYAxis is selected. 
          // Class 'active' has bold text
          if (chosenYAxis === "healthcare"){
            healthcareLabel
              .classed("active", true)
              .classed("inactive", false);
            smokesLabel 
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
          }

          if (chosenYAxis === "smokes"){
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel 
              .classed("active", true)
              .classed("inactive", false);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
          }

          if (chosenYAxis === "obesity"){
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel 
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
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