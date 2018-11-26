const path = require('path');

module.exports = {

  // For React Native version 0.57
  projectRoot: path.resolve(__dirname),
  // tell the builder to also look in the shared directory for imports
  watchFolders: [
    path.resolve(__dirname, "../shared")
  ]
};
