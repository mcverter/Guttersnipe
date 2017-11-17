'use strict';
var shareable = require('./shareables');

module.exports = (sequelize, DataTypes) => {
  var thing = sequelize.define('thing', {
    description_how: DataTypes.TEXT,
    description_what: DataTypes.TEXT

  }, {
    underscored: true,
    classMethods: {
    }
  });

  thing.associate = function(models) {
    thing.hasOne(models.shareable, {
      foreignKey: 'thing_id'
    })
  }

  return thing;
};