var http = require("http");

var server  = http.createServer(function(req, res){
	res.writeHead("200", {"Content-Type": "text-plain"});
	res.end("Hello World");
});

server.listen(Math.round(2000 + Math.random()), function(){
	console.log("server run at 127.0.0.1;", server.address().port);
});