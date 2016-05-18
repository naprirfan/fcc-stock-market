require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var stockList = [];

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket){
	//on user connected
	io.emit('globalNotification', stockList);

	//on user submit form
	socket.on('addStockCode', function(msg){
		//building stock object
		stockList.push({
			name: msg
		});
		console.log(stockList);
		//broadcast the message to all listener
		io.emit('globalNotification', stockList);
	});
});

http.listen((process.env.PORT || 5000), function(){
	console.log('listening on port '+(process.env.PORT || 5000)+'....');
});