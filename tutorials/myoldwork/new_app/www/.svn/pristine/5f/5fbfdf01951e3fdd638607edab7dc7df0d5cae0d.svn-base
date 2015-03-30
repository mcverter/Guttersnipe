'use strict';

describe('Directive: googleMaps', function () {

  // load the directive's module
  beforeEach(module('wwwApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<google-maps></google-maps>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the googleMaps directive');
  }));
});
