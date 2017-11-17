'use strict';
module.exports = (sequelize, DataTypes) => {
  var Kropotkin = sequelize.define('Kropotkin', {
    paragraph: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Kropotkin;
};