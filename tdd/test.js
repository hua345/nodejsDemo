//Test-Driven Development

var assert = require("assert");
var fs = require('fs');




describe('hooks', function() {
  before(function() {
     console.log('runs before all tests in this block');
  });
  beforeEach(function() {
     console.log('runs before each test in this block');
  });
  describe('#indexOf()', function() {
    it('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    it('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(-1));
    });
  });
});




function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
//describe (moduleName, testDetails)
//it (info, function) ,一个it对应一个实际的test case
describe("Array", function(){
  describe("#indexOf()", function(){
    it("should return -1 when value is not present", function(){
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));

    })
  });
  describe('#aaa()', function(){
        it('should return -1 when the value is not present', function(){
        })
    })
})
//Asynchronous
//done ()
//按照瀑布流编程习惯，取名done是表示你回调的最深处，也就是结束写嵌套回调函数。但对于回调链来说done实际上意味着告诉mocha从此处开始测试，一层层回调回去。

describe('File', function(){
    describe('#readFile()', function(){
        it('should read file1 without error', function(done){
            fs.readFile('file1', function(err){
                if (err) throw err;
                done();
            });
        })
    })
})

describe('a suite of tests', function() {
  this.timeout(500);

  it('should take less than 500ms', function(done){
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function(done){
    setTimeout(done, 600);
  });
})


//Test Driven Develop (TDD)
//mocha默认的模式是Behavior Driven Develop (BDD)，要想执行TDD的test的时候需要加上参数，如

//mocha -u tdd test.js
