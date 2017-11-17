'use strict';
module.exports = (sequelize, DataTypes) => {
  var shareable = sequelize.define('shareable', {
    summary: DataTypes.TEXT,
    headline: DataTypes.TEXT,
  }, {
    underscored: true,
    classMethods: {
    }
  });

  shareable.associate = function(models) {
    shareable.belongsTo(models.thing, {
      foreignKey: 'thing_id'
    });
//        shareable.hasOne(models.thing, {foreignKey: 'thing_id'});
    // associations can be defined here
  }

  return shareable;
};