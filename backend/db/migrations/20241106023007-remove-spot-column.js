'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize){

    //this checks if 'spot' column exist in 'Bookings' table
    const result = await queryInterface.sequelize.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'Bookings' AND column_name = 'spot'
      ${options.schema ? `AND table_schema = '${options.schema}'` : ''};
    `);
        //if more than 0 columns THEN it will remove
    if (result[0].length > 0) {
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
