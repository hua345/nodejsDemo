//https://github.com/caolan/async

var async = require("async");
var fs       =  require("fs");
//series(tasks, [callback])
//Run the functions in the tasks array in series, each one running once the previous function has completed. 
async.series([
	function(callback){
		fs.readFile("file1", "utf-8", callback);
	},
	function(callback){
		fs.readFile("file2", "utf-8", callback);
	},
	function(callback){
		fs.readFile("file3", "utf-8", callback);
	}],
	function(err, results){
		console.log(results);
	}
);
//parallel(tasks, [callback])
//Run the tasks array of functions in parallel, without waiting until the previous function has completed. 
async.parallel([
    function(callback){
        setTimeout(function(){ callback(null, 'one'); }, 700);
    },
    function(callback){
       setTimeout(function(){ callback(null, 'two'); }, 1000);
    },
        function(callback){
      setTimeout(function(){ callback(null, 'three'); }, 500);
    },
        function(callback){
       setTimeout(function(){ callback(null, 'four'); }, 100);
    }
],
// optional callback
function(err, results){
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
    console.log(results);
});
//waterfall(tasks, [callback])
//Runs the tasks array of functions in series, each passing their results to the next in the array. 
async.waterfall([
	function(callback){
		fs.readFile("file1", "utf-8", function(err, content){
			callback(err, content);
		});
	},
	function(arg1, callback){
		fs.readFile("file2", "utf-8",  function(err, content){
			console.log(arg1);
			callback(err, content);
		});
	},
	function(arg1, callback){
		fs.readFile("file3", "utf-8",  function(err, content){
			console.log(arg1);
			callback(err, content);
		});
	}],
	function(err, results){
		console.log(results);
	}
);
async.map(['file1', 'file2', 'file3'], fs.stat, function(err, results){
    // results is now an array of stats for each file
    //console.log(results);
});

async.filter(['file1', 'file2', 'file4', 'file3'], fs.exists, function(results){
    // results now equals an array of the existing files
    console.log(results);
});

//auto(tasks, [callback])
//Determines the best order for running the functions in tasks, based on their requirements.
// Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied.

var deps = {
	connectMongoDB: ['readConfig', function(callback){
		callback(null, "conect mongodb OK");
	}],
	connectRedis: ['readConfig', function(callback){
		callback(null, "connect redis OK");
	}],
	uploadAsserts: ["complieAsserts", function(callback){
		callback(null, "upload OK");
	}],
	readConfig: function(callback){
		callback(null, "read config OK");
	},
	complieAsserts: function(callback){
		callback(null, "complie OK");
	}
}
async.auto(deps, function(err, results){
	console.log(results);
});

// function funcSeries(callback){
// 	console.log(callback);
// 	fs.readFile("fileA.txt", "utf-8",  function(err,  content  , callback){
// 		if(err)  return callback(err);
// 		console.log(callback);
// 		fs.readFile("fileB.txt", "utf-8", function(err,  data, callback){
// 			if(err)  return callback(err);

// 			//callback(null, [content,  data]);
// 			console.log(callback);
// 		});
// });
// }	
// funcSeries(function(err, results){
// 	console.log(results);
// })