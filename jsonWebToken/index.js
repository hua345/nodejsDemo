var jwt = require("jsonwebtoken");
var fs = require("fs");
var bluebird = require("bluebird");
var colors = require("colors");
var readFileAsync = bluebird.promisify(fs.readFile);
var events = require("events");
var privateKey;
var publicKey;

var server = new events.EventEmitter();

readFileAsync("rsa_private_key.pem","utf-8")
.then(function(data){
    privateKey = data;
    console.log(data);
    return readFileAsync("rsa_public_key.pem", "utf-8");
})
.then(function(data){
  publicKey = data;
  console.log(data);
  console.log(colors.green("read file OK!"));
  server.emit("readOK");
})
.catch(function(err){
  console.log(colors.red(err));
});

server.on("readOK",function(){
  //jwt.sign(payload, secretOrPrivateKey, options)
  // sign with default (HMAC SHA256)
  var token = jwt.sign({hello: 'world'}, "password");
  //jwt.verify(token, secretOrPublicKey, [options, callback])

  jwt.verify(token, "password", function(err, decoded){
    if(err) throw err;
    console.log(colors.green(decoded.hello));
  });
  // sign with RSA SHA256
  var tokenCert = jwt.sign({hello: 'world'}, privateKey, {algorithm: 'RS256'});

  jwt.verify(tokenCert, publicKey, function(err, decoded) {
    if(err) throw err;
    console.log(colors.green(decoded.hello)) // bar
  });

});
