var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var colors = require("colors");
var url  = "mongodb://127.0.0.1:27017/population";
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

var personSchema = Schema({
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Person' },
  title    : String,
  fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var StoryModel  = mongoose.model('Story', storySchema);
var PersonModel = mongoose.model('Person', personSchema);
//populate
StoryModel.findOne({title: "hello nodejs"})
.populate("author")
.exec(function(err, story){
  if(err) throw err;
  console.log(colors.blue("author name: %s"),story);

});
//field selection
StoryModel.findOne({title: "hello nodejs"})
.populate("author","name")
.exec(function(err, story){
  if(err) throw err;

  console.log(colors.green("author name: %s"),story);
});


//Refs to children
PersonModel.findOne({name: "chenjianhua"})
.populate("stories")
.exec(function(err, person){
  if(err) throw err;
  console.log(colors.yellow("Refs to children: %s"),person);

})

//Populating multiple paths
// StoryModel.findOne({title: "hello nodejs"})
// .populate("author")
// .populate("fans")
// .exec(function(err, story){
//   if(err) throw err;
//   console.log(colors.blue("Populating multiple paths: %s"),story);
//
// });

//Query conditions and other options
// Story
// .find(...)
// .populate({
//   path: 'fans',
//   match: { age: { $gte: 21 }},
//   select: 'name -_id',
//   options: { limit: 5 }
// })
// .exec()

//mongoose.Schema.Types.ObjectId
//mongoose.Types.ObjectId
// console.log(mongoose.Types.ObjectId);
// console.log(new mongoose.Types.ObjectId);
