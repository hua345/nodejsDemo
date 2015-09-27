//https://www.npmjs.com/package/debug

var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

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