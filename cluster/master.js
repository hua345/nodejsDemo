var child_process = require("child_process");
var child1 = child_process.fork("./child.js");
var child2 = child_process.fork("./child.js")
var cpus = require("os").cpus();

var http = require("http");

var server = require("net").createServer();
server.listen(1337, function(){
	child1.send("server", server);
	child2.send("server", server);

	server.close();
})
