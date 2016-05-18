var socket = io();
var dataset = {};

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

$('.alert-danger').click(function(){
	$(this).fadeOut('slow');
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
	dataset = msg;
	console.log(dataset);
	renderStockList(dataset);
	hideStockListLoader();
});

socket.on('addStockCodeSucceed', function(msg){
	//edit existing dataset
	for (var key in msg) {
		dataset[key] = msg[key];
	}
	renderStockList(dataset);
	hideStockListLoader();
});

socket.on('removeStockCodeSucceed', function(msg){
	//edit existing dataset
	delete dataset[msg];
	renderStockList(dataset);
	hideStockListLoader();
});

function showStockListLoader() {
	$('#loader').fadeIn();
}

function hideStockListLoader() {
	$('#loader').fadeOut();
}

function renderStockList(msg) {
	$('#stockListContainer').empty();

	for (var key in msg) {
		if (msg[key] === null) {
			continue;
		}

		var row = $('<div />',{
			class: "row"
		});
		var col = $('<div />',{
			class: "col-lg-12"
		});
		var panel = $('<div />', {
			class: "panel panel-info"
		});
		var panelHeading = $('<div />', {
			class: "panel-heading"
		});
		var h3 = $('<h3 />', {
			class: "panel-title",
			text: key.toUpperCase()
		});
		var panelBody = $('<div />', {
			class: "panel-body",
			text: msg[key].dataset.name
		});
		var panelFooter = $('<div />', {
			class: "panel-footer"
		});
		var removeButton = $('<button />', {
			class: "btn btn-danger pull-right removeStockButton",
			text: "Remove ",
			"data-name" : key
		});
		var trashIcon = $('<span />', {
			class: "glyphicon glyphicon-trash"
		})
		var clearfix = $('<div />', {
			class: "clearfix"
		})

		$(h3).appendTo(panelHeading);
		$(panelHeading).appendTo(panel);
		$(panelBody).appendTo(panel);
		$(trashIcon).appendTo(removeButton);
		$(removeButton).appendTo(panelFooter);
		$(clearfix).appendTo(panelFooter);
		$(panelFooter).appendTo(panel);
		$(panel).appendTo(col);
		$(col).appendTo(row);
		$(row).appendTo('#stockListContainer');	
	}
}