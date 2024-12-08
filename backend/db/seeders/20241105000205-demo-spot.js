'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
      {
        ownerId: 1,
        address: '46 Memory Lane',
        city: 'Los Venos',
        state: 'Nevada',
        country: 'United States',
        lat: -40,
        lng: -39,
        name: 'Mansion in the fields',
        description: 'Nestled in the heart of serene countryside, this luxurious mansion offers a perfect blend of elegance and tranquility. Set on acres of sprawling fields, the estate boasts stunning panoramic views of rolling green hills, creating a peaceful retreat far from the hustle and bustle of city life.',
        price: 300,
        previewImage: "https://images.surferseo.art/fdb08e2e-5d39-402c-ad0c-8a3293301d9e.png"
      },
      {
        ownerId: 2,
        address: '9239 blahblah lane',
        city: 'butter',
        state: 'milk',
        country: 'mashed potato',
        lat: 40.45,
        lng: 39.25,
        name: 'potato medley',
        description: 'yumtastic',
        price: 200
      },
      {
        ownerId: 3,
        address: '3490342 driving drive',
        city: 'bigcity',
        state: 'texas',
        country: 'usa',
        lat: 82,
        lng: -174,
        name: 'real name',
        description: 'definitely a real place',
        price: 15
      },
    ], 
    { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['mansion', 'potato medley', 'real name'] }
    }, {});
  }
};