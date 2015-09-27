//https://github.com/visionmedia/debug

var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

var a = debug('worker:a');
var b = debug('worker:b');

 require('./worker');
// fake app 
 
debug('booting %s', name);
 
var server = http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
});
server.listen(3000, function(){
  debug('listening');
  console.log("server run at 127.0.0.1:", server.address().port);
});

//DEBUG=http,worker node app.js

//Save debug output to a file
//DEBUG=http,worker DEBUG_FD=3 node app.js 3> whatever.log

//the "+NNNms" will show you how much time was spent between calls.
//  http GET / +726ms