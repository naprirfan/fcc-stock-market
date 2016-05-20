var socket = io();
var dataset = {};
var lineColors = {};

$('form').submit(function(){
	if ($('#stockCode').val() == "") return;

	socket.emit('addStockCode', $('#stockCode').val());
	$('#stockCode').val('');
	showStockListLoader();
	return false;
});

$('body').on('click', 'button.removeStockButton', function(){
	var msg = $(this).data("name");
    socket.emit('removeStockCode', msg);
});

socket.on('error', function(msg){
	hideStockListLoader();
	$('.alert-danger').text(msg);
	$('.alert-danger').fadeIn();
	setTimeout(function(){
		$('.alert-danger').fadeOut('slow');
	},7000)
});

socket.on('globalNotification', function(msg) {
	//insert into dataset
	if (!$.isEmptyObject(msg)) {
		dataset = msg;
		lineColors = _getLineColors(dataset);
		renderStockList(dataset, lineColors);
		renderGraph(dataset, lineColors);
	}
	hideStockListLoader();
});

socket.on('addStockCodeSucceed', function(msg){
	//edit existing dataset
	for (var key in msg) {
		dataset[key] = msg[key];
		lineColors[key] = _getSingleColor();
	}
	renderStockList(dataset, lineColors);
	renderGraph(dataset, lineColors);
	hideStockListLoader();
});

socket.on('removeStockCodeSucceed', function(msg){
	//edit existing dataset
	delete dataset[msg];
	delete lineColors[msg]
	renderStockList(dataset, lineColors);
	renderGraph(dataset, lineColors);
	hideStockListLoader();
});

function _getLineColors(dataset) {
	var result = {};

	for (var key in dataset) {
		result[key] = _getSingleColor();
	}
	
	return result;
}

//randomized color
function _getSingleColor() {
	var color = {
		r: Math.floor(Math.random() * 255),
		g: Math.floor(Math.random() * 255),
		b: Math.floor(Math.random() * 255)
	}
	return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
}