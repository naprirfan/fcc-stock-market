const STOCK_API_URL = "https://www.quandl.com/api/v3/datasets/WIKI/";

require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var thirdPartyRequest = require('request');

var dataset = {};

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket){
	//on user connected
	io.emit('globalNotification', dataset);

	//on submit form
	socket.on('addStockCode', function(msg){
		fetchStockData(msg);
	});

	//on remove stock code
	socket.on('removeStockCode', function(msg){
		removeStockData(msg);
	});
});

http.listen((process.env.PORT || 5000), function(){
	console.log('listening on port '+(process.env.PORT || 5000)+'....');
});

function getLastYearTime() {

    var date = new Date();

    var year = +(date.getFullYear()) - 1;

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day;

}

function removeStockData(msg) {
	delete dataset[msg];
	io.emit('removeStockCodeSucceed', msg);
}

function fetchStockData(msg) {
	var url = STOCK_API_URL + msg + ".json?start_date="+ getLastYearTime() +"&api_key=" + process.env.API_KEY;

	thirdPartyRequest.get({url: url}, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var result = JSON.parse(body);
			dataset[msg] = result;
			
			var newData = {};
			newData[msg] = result;
			io.emit('addStockCodeSucceed', newData);
		}
		else {
			io.emit('error', "Data not found. Please check whether the symbol is incorrect");
		}
	});
}