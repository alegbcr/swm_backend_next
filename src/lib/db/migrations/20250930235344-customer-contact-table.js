"use strict";
const {
  CUSTOMER_CONTACT_TABLE,
  CustomerContactSchema,
} = require("../models/customerContact.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      CUSTOMER_CONTACT_TABLE,
      CustomerContactSchema
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_CONTACT_TABLE);
  },
};
