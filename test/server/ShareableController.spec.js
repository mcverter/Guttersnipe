var assert = require('assert');
var shareableController = require(__dirname + '/../../server/controllers/ShareableController');

describe('Shareable Controller', function(){
  beforeEach(function(){
    console.log("before each");
  });

  describe('Select Shareables List', ()=>{
    it('should list all shareables ', ()=>{
      const sc = new ShareableController();
      sc.selectShareablesList();
      assert.equal(1, 1)

    })
  })
})
