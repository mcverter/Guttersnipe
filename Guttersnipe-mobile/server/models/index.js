'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable],
    {logging: console.log});
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config,
    {logging: console.log});
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*
//Models/tables
db.shareables = require('./shareables')(sequelize, Sequelize);
db.things = require('./things')(sequelize, Sequelize);

//Relations
db.things.belongsTo(db.shareables, {foreignKey: 'ThingId'});
db.shareables.hasOne(db.things, {foreignKey: 'ThingId'});
*/
module.exports = db;
