'use strict';

module.exports = (sequelize, DataTypes) => { // sequelize object and datatypes
  const User = sequelize.define('User', { //schema
    name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // Shop hasMany Coffees
    User.hasMany(models.Coffee); // association happens here
  };
  return User;
};