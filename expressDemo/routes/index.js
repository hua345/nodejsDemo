var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var fs = require("fs");
var bluebird = require("bluebird");
var colors = require("colors");
var readFileAsync = bluebird.promisify(fs.readFile);
var events = require("events");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next){
  var encrtoKey = {};

  var server = new events.EventEmitter();

  readFileAsync("rsa_private_key.pem","utf-8")
  .then(function(data){
      encrtoKey.privateKey = data;
      return readFileAsync("rsa_public_key.pem", "utf-8");
  })
  .then(function(data){
    encrtoKey.publicKey = data;
    console.log(colors.green("read file OK!"));
    server.emit("readOK");
  })
  .catch(function(err){
    console.log(colors.red(err));
  });

  server.on("readOK",function(){
    var tokenTest = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjE3ODc1MjY2OTcwIiwiaWF0IjoxNDQ0MzAwMDE2fQ.iWj_cGNdcOIEJgCNWmbrDwckmCUM2bN0A" +
    "myNVgnxrA7rV3cpoXbAkguJyQYbZDlMpjRSHUDhXUKnyLuwuaKYO-wuEeEAcWl3gXArhbEqKdKbeVAXqzVWlreAfiId0rUqzxdEf3KQ38E1QFP6koVlko9hbzJ3unLf1pkFDEylK1U";
    var aa = "errorjsonwebtoken";

    jwt.verify(aa, encrtoKey.publicKey, function(err, decoded) {
      if(err)  {
        return res.json({
          message:"accesstoken错误"
        });
      }
      res.json({
        message:"accesstoken正确"
      });
    });//jwt
  });//on
});//get
module.exports = router;
