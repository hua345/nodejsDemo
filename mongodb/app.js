// mongoose 链接
var mongoose = require('mongoose');
//-- auth   mongodb://username:password@hostname:port/database
//without auth    mongodb://localhost/database
var url  = "mongodb://testOwner:password@127.0.0.1:27017/test";
mongoose.connect(url); 
//get mongoose instance
var db = mongoose.connection;

// 链接错误
db.on('error', function(error) {
    console.log(error);
});
//
db.once('open', function (callback) {
    console.log("auth OK");
});
// Schema 结构
var mongooseSchema = new mongoose.Schema({
    username : {type : String, default : '匿名用户'},
    title    : {type : String},
    content  : {type : String},
    time     : {type : Date, default: Date.now},
    age      : {type : Number}
});

// 添加 mongoose 实例方法
mongooseSchema.methods.findbyusername = function(username, callback) {
    return this.model('mongoose').find({username: username}, callback);
}

// 添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({title: title}, callback);
}

// model
var mongooseModel = db.model('mongoose', mongooseSchema);

// 增加记录 基于 entity 操作
var doc = {username : 'entity_demo_username', title : 'entity_demo_title', content : 'entity_demo_content'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('save entity_demo  OK!');
    }
});

// 增加记录 基于model操作
var doc = {username : 'model_demo_username', title : 'model_demo_title', content : 'model_demo_content'};
mongooseModel.create(doc, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('save model_demo Ok!');
    }
});

// 修改记录
//mongooseModel.update(conditions, update, options, callback);
var conditions = {username : 'model_demo_username'};
var update     = {$set : {age : 27, title : 'model_demo_title_update'}};
var options    = {upsert : true};

mongooseModel.update(conditions, update, options, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('update ok!');
    }
});

// 查询
// 基于实例方法的查询
var mongooseEntity = new mongooseModel({});
mongooseEntity.findbyusername('model_demo_username', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
});

// 基于静态方法的查询
mongooseModel.findbytitle('entity_demo_title', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
});

// mongoose find
var criteria = {title : 'entity_demo_title'}; // 查询条件
var fields   = {title : 1, content : 1, time : 1}; // 待返回的字段
var options  = {};
mongooseModel.find(criteria, fields, options, function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }

    // 删除记录
var condition1 = {username: 'entity_demo_username'};
mongooseModel.remove(condition1, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log(condition1,'  delete ok!');
    }
});
// 删除记录
var condition2= {username: 'model_demo_username'};
mongooseModel.remove(condition2, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log(condition2, '   delete ok!');
    }
});

});

