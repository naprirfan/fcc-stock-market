var socket = io();

$('form').submit(function(){
	socket.emit('addStockCode', $('#stockCode').val());
	$('#stockCode').val('');
	return false;
});

socket.on('globalNotification', function(msg) {
	var stockList = [];
	for(var i = 0; i < msg.length; i++) {
		stockList.push(msg[i].name);
	}
	$('#stockList').append('<p>'+ stockList.join(" ") + '</p>');	
});