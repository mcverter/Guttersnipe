'use strict';

describe('Service: api', function () {

  // load the service's module
  beforeEach(module('wwwApp'));

  // instantiate service
  var api;
  beforeEach(inject(function (_api_) {
    api = _api_;
  }));

  it('should do something', function () {
    expect(!!api).toBe(true);
  });

});
