'use strict';
module.exports = (sequelize, DataTypes) => {
  var MainType = sequelize.define('MainType', {
    name: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MainType;
};