var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var error = new Error("hello ERROR");
  error.status = 501;
   next(error);
   console.log("hello after next");
});
/* GET home page. */
router.get('/throw', function(req, res, next) {
  var error = new Error("hello ERROR");
  error.status = 501;
   throw error;
   console.log("hello after next");
});

/* GET home page. */
router.get('/return', function(req, res, next) {
  try{
  var error = new Error("hello ERROR");
  error.status = 501;

  res.json({
    messge:"return error"
  });
//   next(error);
  throw error;
 }
 catch(err){
   throw err;
 }

});
/* GET home page. */
router.get('/return2', function(req, res, next) {

  var error = new Error("hello ERROR");
  error.status = 501;
  res.json({
    messge:"return error"
  });
//   next(error);
  throw error;

});
module.exports = router;
