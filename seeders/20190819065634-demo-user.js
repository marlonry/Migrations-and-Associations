'use strict';

const User = require("../models").User;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.
    queryInterface.bulkInsert('Users', [{
      name: 'Starbucks',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    const user = await User.findOne({
      where: {
          name: 'Starbucks',
      },
    });

    return await queryInterface.bulkInsert('Coffees', [{
      name: "Colombian",
      type: "Roast",
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: user.id,
    }], {});
  },

  down: async(queryInterface, Sequelize) => {
    // Add reverting commands here.
    // Return a promise to correctly handle asynchronicity.
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Coffees', null, {});
  }
};
