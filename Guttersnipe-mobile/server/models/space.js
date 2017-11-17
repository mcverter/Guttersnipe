'use strict';
module.exports = (sequelize, DataTypes) => {
  var Space = sequelize.define('Space', {
    postition: DataTypes.GEOMETRY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Space;
};