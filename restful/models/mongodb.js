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
  email:{type: String, default:"2290910211@qq.com"},
  token:String
});

exports.User = mongoose.model("users", userSchema);
