var jwt = require("jsonwebtoken");
var colors = require("colors");

//检查用户会话
module.exports = function(req, res, next){
  //检查post的信息或者　url查询参数　或者http头部信息
  //只要参数有token或者头信息里有x-access-token，我们就认定它是一个api接口
  var token = req.body.token || req.query.token || req.headers["x-access-token"];

  if(token){
    jwt.verify(token, "mypassword", function(err, decoded){
      if(err){
        return res.status(403).json({success:false, message: "token信息错误"});
      }
      else{
        //如果没有问题把解码信息保存到请求中
        req.api_user = decoded;
        console.log(colors.green(req.api_user));
        next();
      }
    })
  }
  else {
    //如果没有token返回错误
    return res.status(403).send({
      success:false,
      message:"没有提供token"
    })
  }
}
