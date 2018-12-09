var path = require("path");
console.log('AAAAAAAAA');

var config = {
  getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(__dirname),

      // Include your forked package as a new root.
      path.resolve(__dirname, "../shared")
    ];
  }
};

module.exports = config;
