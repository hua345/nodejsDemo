//https://github.com/kriskowal/q
//https://github.com/bellbind/using-promise-q/
var Q = require("q");
var fs = require("fs");
var dns = require('dns');
var colors = require("colors");
//Using Deferreds
function readFileAsync(filename){
  var deferred = Q.defer();
  fs.readFile(filename,"utf-8", function(err, data){
    if(err) deferred.reject(new Error(err));
    else deferred.resolve(data);
  });
  return deferred.promise;
}
//chain promises. You can chain promises either inside or outside handlers.
readFileAsync("file2").then(function(data){
  console.log(colors.green(data));
  return JSON.stringify({hello: "world"});
}).then(function(data){
  console.log(colors.green(data));
  return readFileAsync("file");
}).then(function(data){
  console.log(colors.green(data));
}).fail(function(err){
  console.log(colors.red(err));
});
//A promise of multiple values and spread
//The then callback always accepts just one argument. So you want to pass multiple values as a array like [value1, value2]
function dnsAsync(hostname){
  var deferred = Q.defer();
  dns.lookup(hostname, function(err, address, family){
    if(err) deferred.reject(new Error(err));
    else deferred.resolve([address, family]);
  });
  return deferred.promise;
}

dnsAsync("www.baidu.com").spread(function(address, family){
   console.log(colors.green("address : %s family: %s"), address, family);
}, function(err){
    console.log(colors.red(err));
});
//You can create a promise from a value using Q.fcall.
function funcAsync(){
  return Q.fcall(function () {
     return 10;
  });
}

//The then method accept two callback args; the first callback catches successful result, and the second catches error as failure.
funcAsync().then(function(data){
  console.log(colors.green(data));
}, function(err){
  console.log(colors.red(err));
});
//Adapting Node Q.nfcall Q.nfapply
function nodeFileAsync(filename){
  return Q.nfcall(fs.readFile,filename,"utf-8");
}
nodeFileAsync("file2").then(function(data){
  console.log(colors.green(data));
}, function(err){
  console.log(colors.red(err));
});
