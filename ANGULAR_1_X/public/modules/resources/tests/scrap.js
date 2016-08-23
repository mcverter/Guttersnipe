/**
 * Created by mitchell on 4/30/2015.
 */
/*
JavaScript Test
Core JavaScript

1.      What is the simplest way to create an empty Object?
*/
var obj = {};
// 2.      How to extend that Object so it will have a member named “foo” with value “buzz”?
  obj.foo = 'buzz';
/*3.      How to create a JavaScript Class?
  A class is just a function, which initializes the *this* pointer passed into it.
  You return an instance of the class by calling it with the new keyword
  */
function MyClass(val1, val2) {
  this.val1 = val1;
  this.val2 = val2;
}
var instance = new MyClass('a', 1);
/*
4.      How to extend a Class so that each new instance will have a method “read” that returns “Hello Class”?
*/

MyClass.prototype.read = function getRead(){
  return "Hello Class";
}
//  5.      How to extend a Class with a static method “version” that returns “1.0”?
MyClass.version = function getVersion() {
  return "1.0";
}
//  6.      Demonstrate the use of closure to return a private property of an Object.
var fooClosed = 'bar';
Object.defineProperties(obj, {
  foo : {
    enumerable: true,
    get: function getFoo() { return fooClosed}
  }
});

//7.      What is the simplest way to create an Array?
var array = [];
//  8.      Initialize that array with values 3,2,4,1.
array = [3,2,4,1];
//9.      How to sort this array to have an output 1,2,3,4?
var sorted = array.sort();
//  10.  Demonstrate the use of a native HTML5 array method that would only return even values?
var filtered = array.filter(function even (val){
  val % 2 == 0;
});
//  11.  What is the fastest way to empty an Array?
array = [];
//  12.  Demonstrate how to select a subset of array that returns values 2 and 3 (from already sorted one).
var spliced = sorted.slice(2, 4);
// 13.  How to append a value to an array?
sorted.push(7);
//  14.  How to prepend a value to an array?
sorted.unshift(0);
//  15.  Demonstrate how to join two Arrays [1,2,3] and [4,5,6] together.
var onetwothree = [1,2,3];
var fourfivesix = [4,5,6];
onetwothree.concat(fourfivesix);
//16.  Demonstrate an optimal way to sum up all the values in the array [5,25,15,7].
var reduced = [5,25,15,7];
var reducedVal = reduced.reduce(function sum (prev, curr) {
  return prev + curr;
})
//17.  Convert the string “1,2,3,4” into an Array.
var str = '1,2,3,4';
var split = str.split(',')
//18.  Write a function that replaces even values in the string above into letter “E”.
var replacable = 'hellosmello';
var replaced = replacable.replace('e', 'E');
//19.  Test a string “123” for being a numeric value.
var onetwothree = ('123')
function isNumber(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
};
var is_num = isNumber(onetwothree);
//20.  Cast a string “123” into an integer.
var number123 = Number(onetwothree);

//21.  Convert a binary string “0001” into an integer.
var binStr = '0001';
var binToDec = parseInt(binStr);
//22.  Write a function foo () that executes in the scope of an Object {name: “bob”} so that it returns a name property.
bobobj = {name: 'bob'};
bobobj.foo = function(){
  return this.name;
}
//  Theory
/*
1.      What is a closure in JavaScript?

It refers to the fact that a function closes over the variables defined within it.
These variables are still visible to any functions declared within that function or object's scope, even after that outer function has finished executing.
  2.      What is event capturing and event bubbling? When would I consider using this?

  When an event is generated, the event bubbles up through all the DOM/javascript layers.  For example, a mouse click will be captured by the dom element, then the enclosing element, all the way up to the window object.

  An element would capture that element to react to it and would allow it to pass up if an enclosing element needed it too.  However, you would call event.preventDefault() if you wanted to prevent a certain interaction from occuring -- for example, if you wanted to prevent a form from being submitted to the server.

  3.      What is JavaScript scope chain?
  4.      What is ‘this’ in JavaScript, and what is a method’s execution context?


*/
  jQuery

  1.      Select all DOM elements in the document with CSS class “.nav-link”.
2.      Using jQuery append a new “div” element to the document body.
3.      Extend an object {name: “bob”} with additional property “age” with value 35.
4.      Demonstrate the use of $.proxy to change the scope of a function.
5.      Demonstrate the use of $.Deferred to return a promise that executes a successful callback in 100ms.
6.      How would you post-process (intercept) the successful promise callback to always return value “Hello World”?
  7.      Can you extend jQuery so that each selected DOM element would have a method “foo”?
  8.      Write a “click” event handler for all DOM elements with class “.nav-link”.
9.      Write the similar event handler as above but for all DOM elements not yet inserted into the DOM (for all future elements).
10.  When does $(document).ready(function(){}) executes?
  11.  When binding an event in jQuery what are event arguments and event data?

  AngularJS

  1.      Demonstrate the use of directives to create a TAG directive “myTag”.
2.      Inject a $rootScope into above directive’s controller.
3.      How would you write the same directive so it doesn’t break during JavaScript minification?
  4.      How would you enforce a digest process from within a custom event handler?
  5.      How would you restrict that process only to the scope of one particular directive (instead of a whole document)?
  6.      Can you demonstrate the use of $compile to process a template injected into the DOM dynamically?
  7.      How would you share data/value/functionality between one or more controllers?
  8.      Can you initialize angular without using ng-app attribute? How?
  9.      How do you think AngularJS achieves inferred scope injection through the use of arguments? Ex: function ($scope) {}?
  10.  How would one pass and capture a scope expression from the parent scope into a widget?
  11.  I have a model with variable price “scope.price” and a method “scope.updatePrice”. How can I have “scope.updatePrice” executed when “scope.price” changes?
  12.  I have an inline edit widget that turns text into input in edit mode when clicked. When clicking to edit, how can we notify the page that something is in edit mode on this page?
  13.  I have several kinds of resizing directives, one for Text, one for Images, one for table columns. How could one share the common functionality between these widgets?
  14.  What does directive property transclude do? When do you think you would need to transclude a directive?


  OO Design
1.      Demonstrate the use of OO design to work with the following use case. We have a product Factory that produces several Products. Each Product consists of several Parts. Each Part has a cost associated with it. Please write object model with methods that can provide:
  a.      Total number of Products a factory produces
b.      Individual cost of a Product
c.       Total cost of all Products produced
