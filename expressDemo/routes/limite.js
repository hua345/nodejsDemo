var express = require('express');
var router = express.Router();
var redisTest = require("../models/redis.js");
var ratelimit = require("ratelimiter");
var colors = require("colors");

/* GET users listing. */
router.get('/',function(req, res, next){
  console.log(colors.yellow(req.query.userId));
  var limit = new ratelimit({
    "id":req.query.userId,
    "db":redisTest,
    "duration:": 1 * 60 * 60 * 1000,
    "max":100
  });
  limit.get(function(err, limit){
    if(err) return next(err);
    res.set('X-RateLimit-Limit', limit.total);
    res.set('X-RateLimit-Remaining', limit.remaining - 1);
    res.set('X-RateLimit-Reset', limit.reset);
    // all good
    console.log(colors.green('remaining ', limit.remaining - 1, limit.total, limit.reset));
    if (limit.remaining) return next();
    else{
      return res.status(429).json({
        "message": "too often request"
      });
    }
  })
}, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
