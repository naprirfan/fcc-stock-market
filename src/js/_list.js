$('.alert-danger').click(function(){
	$(this).fadeOut('slow');
});

function showStockListLoader() {
	$('#loader').fadeIn();
}

function hideStockListLoader() {
	$('#loader').fadeOut();
}

function renderStockList(dataset, lineColors) {
	$('#stockListContainer').empty();

	for (var key in dataset) {
		if (dataset[key] === null) {
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
			class: "panel-heading",
			style: "background-color: " + lineColors[key]
		});
		var h3 = $('<h3 />', {
			class: "panel-title",
			text: key.toUpperCase()
		});
		var panelBody = $('<div />', {
			class: "panel-body",
			text: dataset[key].dataset.name
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