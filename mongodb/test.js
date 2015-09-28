var mongoose = require("mongoose");
var colors = require("colors");
var url  = "mongodb://127.0.0.1:27017/restful";
mongoose.connect(url);
//get mongoose instance
var db = mongoose.connection;

// 链接错误
db.on('error', function(error) {
    console.log(colors.red(error));
});
db.once('open', function (callback) {
    console.log(colors.green("mongodb init OK!"));
});



var userSchema = new mongoose.Schema({
  username: {type: String, default: "demo"},
  password: {type: String, default: "123456"},
  email:{type: String, default:"2290910211@qq.com"}
});

var userModel = mongoose.model("users", userSchema);

var userEntity = new userModel({username: "chenjianhua",password: "123456"});

console.log(userEntity);

userEntity.save(function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("save userEntity OK!");
  }
})
