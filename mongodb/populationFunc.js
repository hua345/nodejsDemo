var personIntance = new PersonModel({
   name: "chenjianhua" ,
   age: 23
 });
personIntance.save(function(err){
  if(err) throw err;
  //生成ObjectId
  var storyId = new mongoose.Types.ObjectId;
  console.log(storyId);
  var story1 = new StoryModel({
    _id: storyId,
    author: personIntance._id,
    title: "hello nodejs"
  });
  story1.save(function(err){
    if(err) throw err;
  });
  //更新person创建的story1
  // PersonModel.update({_id: personIntance._id}, {"$addToSet":{stories:story1._id}}, function(err){
  //   if(err) throw err;
  // });
   personIntance.update({"$addToSet":{stories:storyId}},function(err){
      if(err) err;
   });
});
// personIntance.save(function(err){
//   //生成ObjectId
//
//   if(err) throw err;
//   var story1 = new StoryModel({
//     author: personIntance._id,
//     title: "hello nodejs"
//   });
//   story1.save(function(err){
//     if(err) throw err;
//   });
//   //更新person创建的story1
//   // PersonModel.update({_id: personIntance._id}, {"$addToSet":{stories:story1._id}}, function(err){
//   //   if(err) throw err;
//   // });
//    personIntance.update({"$addToSet":{stories:story1._id}},function(err){
//       if(err) err;
//    });
// });
