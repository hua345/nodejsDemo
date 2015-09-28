var express = require('express');
var router = express.Router();
var jwt    = require("jsonwebtoken");
var userModel  = require("../models/mongodb.js").User;
var middleCheckToken = require("../middleware/check-token.js")
// auth
router.post('/auth', function(req, res, next) {

  userModel.findOne({username: req.body.username},"username password",function(err, data){
    if (err) throw err;
    console.log(JSON.stringify(req.body));

    console.log(data);
    if (!data) {
        res.json({ success: false, message: '认证失败，用户名找不到' });
    } else if (data) {

      // 检查密码
      if (data.password != req.body.password) {
          res.json({ success: false, message: '认证失败，密码错误' });
      } else {
        // 创建token
        var token = jwt.sign(data,"mypassword" , {
            'expiresInMinutes': 1440 // 设置过期时间
        });
        // json格式返回token
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
      }
    }
  });
});

router.get("/user/:username", middleCheckToken, function(req, res, next){

  userModel.findOne({username:req.params.username}, function(err, data){
      if(err) throw err;
      if(data){
        res.json({
            success:true,
            data:data
        });
      }
      else{
          res.status(200).send({
            success:false,
            message:"用户不存在"
          });
      }
    });
})



router.get('/me', middleCheckToken, function(req, res) {
    userModel.findOne({username:req.api_user.username}, function(err, data) {
        if (err) throw err;

        if(data){
            res.json({
              success:true,
              data:data
            });
        }
        else {
          res.status(200).send({
            success:false,
            message:"用户不存在"
          });
        }
    });
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send({});
    }
}

module.exports = router;
