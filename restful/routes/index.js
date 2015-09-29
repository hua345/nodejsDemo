var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var middleCheckToken = require("../middleware/check-token.js");
var util = require("util");
var fs = require('fs');
var _uploadDir = "./public/uploadFiles/";
var path = require('path');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({ hello: 'World' });
});
router.post('/', function(req, res, next) {
  res.status(200).send(JSON.stringify(req.body));
});

//使用multiparty处理上传文件
router.post('/upload', middleCheckToken, function(req, res) {
  // parse a file upload
  //uploadDir - Only relevant when autoFiles is true.
  //The directory for placing file uploads in. You can move them later using fs.rename(). Defaults to os.tmpDir().
  var form = new multiparty.Form({
    maxFilesSize:1024*1024, //1mb
    uploadDir:"./public/uploadFiles/"
  });
// Parts are emitted when parsing the form
  form.on('part',function(data){
    if(!data.filename){
      // filename is not defined when this is a field and not a file
    console.log("got field named %s",data.name);
      data.resume();
    }
    else{
    console.log("got file named %s",data.name);
      data.resume();
    }
  });
  form.on('file', function(name,file){
    console.log(name, file);
  });
  // Close emitted after form parsed
  form.on('close', function() {
    console.log('Upload completed!');
    res.setHeader('Content-Type','text/plain');
    res.end('Received files');
  });
  //fields is an object where the property names are field names and the values are arrays of field values.
  //files is an object where the property names are field names and the values are arrays of file objects.
  form.parse(req);
  //如果form.parse有回调,autoFields和autoFiles会被设置为true,文件会自动保存
  //form.parse(req, function(err, fields, files) {})
});
//使用multiparty处理上传文件
router.post('/upload2', middleCheckToken, function(req, res) {
  //uploadDir - Only relevant when autoFiles is true.
  //The directory for placing file uploads in. You can move them later using fs.rename(). Defaults to os.tmpDir().
  var form = new multiparty.Form({
    maxFilesSize:1024*1024, //1mb
    autoFiles:true,
    uploadDir:_uploadDir
  });

  //fields is an object where the property names are field names and the values are arrays of field values.
  //files is an object where the property names are field names and the values are arrays of file objects.
  form.parse(req,function(err, fields, files){
    if(err) throw err;
    console.log(JSON.stringify(fields));
    console.log(fields.keyname);

    console.log(JSON.stringify(files));
    if(files.filename.length > 0){
      console.log(files.filename[0].originalFilename);
      saveToMydir(files.filename[0].path, req.api_user.username);
    }

    res.setHeader("Content-Type","application/json");
    res.send({"success": true});
  });
});
router.post("/uploadme", middleCheckToken, function(req, res){
  console.log(req.files);
  res.send("OK");
})

function saveToMydir(oldPath, username){
  //fs.rename(oldPath, newPath, callback)
  //获取文件名
  var tempFile = path.basename(oldPath);
  var toPath = path.join(_uploadDir,username);
  console.log(tempFile,toPath);
  fs.exists(toPath,function(exist){
      if(!exist){
        fs.mkdirSync(toPath);
      }
      //移动文件
      fs.rename(path.join(_uploadDir,tempFile), path.join(toPath, tempFile),function(err){
        if(err) throw err;
      })
  });
}
module.exports = router;
