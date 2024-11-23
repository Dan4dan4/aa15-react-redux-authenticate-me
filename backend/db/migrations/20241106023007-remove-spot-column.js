'use strict';
//had to use
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in production
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Check the dialect being used
    const dialect = queryInterface.sequelize.options.dialect;

    if (dialect === 'sqlite') {
      // For SQLite, use Sequelize's describeTable method to check if 'spot' exists
      const table = await queryInterface.describeTable('Bookings');

      if (table.spot) {
        // If 'spot' column exists, remove it
        await queryInterface.removeColumn('Bookings', 'spot');
      }
    } else if (dialect === 'postgres') {
      // For PostgreSQL, use information_schema query
      const result = await queryInterface.sequelize.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'Bookings' AND column_name = 'spot'
        ${options.schema ? `AND table_schema = '${options.schema}'` : ''};
      `);

      if (result[0].length > 0) {
        // If 'spot' column exists, remove it
        await queryInterface.removeColumn('Bookings', 'spot');
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // Add the 'spot' column back
    await queryInterface.addColumn('Bookings', 'spot', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
