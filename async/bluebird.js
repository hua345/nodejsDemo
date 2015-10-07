//https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification
var fs = require("fs");
var dns = require('dns');
var Promise = require("bluebird");
Promise.promisifyAll(fs);

fs.readFileAsync("file1").then(JSON.parse).then(function(val) {
    console.log(val.success);
})
.catch(SyntaxError, function(e) {
    console.error("invalid json in file");
})
.catch(function(e) {
    console.error("unable to read file");
});

var readFile = Promise.promisify(require("fs").readFile);

readFile("file1", "utf8").then(function(contents) {
    return eval(contents);
}).then(function(result) {
    console.log("The result of evaluating file1", result);
}).catch(SyntaxError, function(e) {
    console.log("File had syntax error", e);
//Catch any other error
}).catch(function(e) {
    console.log("Error reading file", e);
});

//Optionally, you can define a custom suffix
Promise.promisifyAll(dns, {suffix: "MyAsync"});
//Use .spread with APIs that have multiple success values:
dns.lookupMyAsync("www.baidu.com").spread(function(address, family){
  console.log("address : %s family: %s", address, family);
})
.catch(function(e){
  console.error(e);
})
