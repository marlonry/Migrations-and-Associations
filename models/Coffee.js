'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Coffee.associate = function(models) {
    //Coffee belongsTo Shop
    Coffee.belongsTo(models.User) // association happens here, you can pass optional options here {foreignKey: 'userId'} => defult 'UserId'
  };
  return Coffee;
};