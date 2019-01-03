const path = require('path');
console.log('hello world');
module.exports = {
  getProjectRoots() {
    return [
      path.join(__dirname, '..'),

      path.join(__dirname, '..', 'shared'),
      path.join(__dirname, '..', 'shared', 'new-redux'),
      __dirname
    ];
  }
};
