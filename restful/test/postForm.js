var http = require('http');
var querystring = require('querystring');
var post_data  = querystring.stringify({
         username: "username",
         password: "password"
  });
var options = {
     host:'localhost',
     port:8080,
     path:'/api/auth',
     method:'post',
     headers:{
       "Content-Type" : 'application/x-www-form-urlencoded',
       "Content-Length": post_data.length
     }
}
var req = http.request(options, function(res) {
    console.log(post_data);
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.stack);
});
// write data to request body
req.write(post_data);
req.end();
