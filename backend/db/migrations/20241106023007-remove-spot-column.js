'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize){
    const bookingTable = await queryInterface.describeTable('Bookings');

    if (bookingTable && bookingTable.spot){
      await queryInterface.removeColumn('Bookings', 'spot');
    }
  },

  async down(queryInterface, Sequelize){
    await queryInterface.addColumn('Bookings', 'spot', {
      type: Sequelize.STRING,
      allowNull: false, 
    });
  }
};
