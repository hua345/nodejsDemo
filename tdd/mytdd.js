//The TDD interface provides suite(), test(), suiteSetup(), suiteTeardown(), setup(), and teardown():
var mocha  = require("mocha");
var suite = mocha.Suite;
var test = mocha.Test;
var setup = mocha.Setup;
var suiteSetup = mocha.SuiteSetup;
var assert = require("assert");

suite('Array', function() {
  console.log("ok");
  setup(function() {
     console.log("setup ...");
  });
  suiteSetup(function(){
     console.log("suitesSetup ...");
  });
  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(-1));
    });
  });
});
