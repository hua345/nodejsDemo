var http = require("http");

var server  = http.createServer(function(req, res){
	res.writeHead("200", {"Content-Type": "text-plain"});
	res.end("Hand by child, pid is " + process.pid + '\n');
});

process.on("message", function(m , tcp){
	if("server" === m){
		tcp.on("connection", function(socket){
			server.emit("connection", socket);
		})
	}
	else if("hello" === m){
		console.log(tcp);
	}
})