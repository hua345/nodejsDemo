var express = require('express');
var router = express.Router();
var jwt    = require("jsonwebtoken");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({ hello: 'World' });
});
router.post('/', function(req, res, next) {
  res.status(200).send(JSON.stringify(req.body));
});

module.exports = router;
