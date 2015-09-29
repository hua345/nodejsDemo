var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt    = require("jsonwebtoken");

var index = require("./routes/index");
var api = require("./routes/api");

var app = express();

app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
//This does not handle multipart bodies, due to their complex and typically large nature. 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use("/",index);
app.use("/api", api);


app.listen(8080, function(){
  console.log("server run at 127.0.0.1:8080");
})
//https://github.com/expressjs/body-parser
