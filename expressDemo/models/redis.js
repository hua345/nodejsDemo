var redis = require("redis");
var debug = require("debug");
var colors = require("colors");
var bluebird = require("bluebird");
var redisTest = redis.createClient();//redis.createClient() = redis.createClient(6379, '127.0.0.1', {})
var assert = require("assert");
//promise
bluebird.promisifyAll(redis.RedisClient.prototype);

//选择数据库
redisTest.SELECT("0", function (err) {
    if (err)  throw err;
    console.log(colors.green("redis select 0 ok!"));
});

exports.redisTest = redisTest;
