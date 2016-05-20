/*
DATASET structure :
[0:"Date"
1:"Open"
2:"High"
3:"Low"
4:"Close"
5:"Volume"
6:"Ex-Dividend"
7:"Split Ratio"
8:"Adj. Open"
9:"Adj. High"
10:"Adj. Low"
11:"Adj. Close"
12:"Adj. Volume"]

*/

function renderGraph(dataset, lineColors) {
	//reset svg
	$('svg').empty();

	//define width & height
	var margin = {top: 30, right: 20, bottom: 30, left: 50};
    var width = $("#chart").width() - margin.left - margin.right;
    var height = (.75 * width) - margin.top - margin.bottom;

	// Parse the date / time
	var parseDate = d3.time.format("%Y-%m-%d").parse;

	// Set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom").ticks(5);

	var yAxis = d3.svg.axis().scale(y)
	    .orient("left").ticks(5);

	// Define the line
	var valueline = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close); });
	    
	// Adds the svg canvas
	var svg = d3.select("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");


	for (var key in dataset) {
		var arr = dataset[key].dataset.data;
		var data = [];
		for (var i = 0; i < arr.length; i++) {
			data.push({date: arr[i][0], close: arr[i][4]});
		}

		//rendering
		data.forEach(function(d) {
	        d.date = parseDate(d.date);
	        d.close = +d.close;
	    });

	    // Scale the range of the data
	    x.domain(d3.extent(data, function(d) { return d.date; }));
	    y.domain([0, d3.max(data, function(d) { return d.close; })]);

	    // Add the valueline path.
	    svg.append("path")
	        .attr("class", "line")
	        .attr("stroke", lineColors[key])
	        .attr("d", valueline(data));
	}
	

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}