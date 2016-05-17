require('dotenv').config();
//setup variables & modules
var path = require('path'); 
var express = require("express");
var app = express();
app.use('/dist', express.static(__dirname + '/dist'));

/*
-------------
ROUTES
-------------
*/
app.get("/", function(req,res){
	res.sendFile(path.resolve('dist/index.html'));	
});

app.get("*", function(req,res){
	res.end("404!");
});

//start server
app.listen(process.env.PORT || 5000);
console.log("I'm listening...");