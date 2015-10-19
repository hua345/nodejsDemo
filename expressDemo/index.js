var jwt = require("jsonwebtoken");
var fs = require("fs");
var bluebird = require("bluebird");
var colors = require("colors");
var readFileAsync = bluebird.promisify(fs.readFile);
var events = require("events");

var encrtoKey = {};

var server = new events.EventEmitter();

readFileAsync("rsa_private_key.pem","utf-8")
.then(function(data){
    encrtoKey.privateKey = data;
    console.log(data);
    return readFileAsync("rsa_public_key.pem", "utf-8");
})
.then(function(data){
  encrtoKey.publicKey = data;
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


  //RSA 公钥私钥需要指定SHA256算法
  var tokenCert = jwt.sign({hello: 'world'}, encrtoKey.privateKey, {algorithm: 'RS256'});

  jwt.verify(tokenCert, encrtoKey.publicKey, function(err, decoded) {
    if(err) throw err;
    console.log(colors.green(decoded.hello));
  });

  var tokenTest = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjE3ODc1MjY2OTcwIiwiaWF0IjoxNDQ0MzAwMDE2fQ.iWj_cGNdcOIEJgCNWmbrDwckmCUM2bN0A" +
  "myNVgnxrA7rV3cpoXbAkguJyQYbZDlMpjRSHUDhXUKnyLuwuaKYO-wuEeEAcWl3gXArhbEqKdKbeVAXqzVWlreAfiId0rUqzxdEf3KQ38E1QFP6koVlko9hbzJ3unLf1pkFDEylK1U";
  jwt.verify(tokenTest, encrtoKey.publicKey, function(err, decoded) {
    if(err) throw err;
    console.log(colors.green(decoded.phoneNumber));
  });
});
