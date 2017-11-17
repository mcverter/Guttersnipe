'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subtype = sequelize.define('Subtype', {
    name: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Subtype;
};