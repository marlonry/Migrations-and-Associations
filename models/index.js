'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); // gets current filename
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// __filename current filename
// __dirname current directory in this case -> models
// path.join Join several segments into one path:

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }) // gets alld files from the models
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model; // puts in the db object created above
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // call the associate functions
  }
});

db.sequelize = sequelize; // the sequelize models and database object
db.Sequelize = Sequelize; // sequelize 

module.exports = db;
