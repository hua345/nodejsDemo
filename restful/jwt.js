var jwt = require("jsonwebtoken");
//jwt.sign(payload, secretOrPrivateKey, options)
var token = jwt.sign({hello: "world"},"mypasswd");

console.log("token %s",token);

//jwt.verify(token, secretOrPublicKey, [options, callback])
jwt.verify(token,"mypasswd", function(err, decoded){
	if(err) throw err;
	console.log("verify OK hello %s", decoded.hello);
});


// get the decoded payload ignoring signature, no secretOrPrivateKey needed 
// option complete : get the decoded payload and header 
var decoded = jwt.decode(token, {complete: true});
console.log(decoded.header);
console.log(decoded.payload);

