"use strict";
import {
  CUSTOMER_CONTACT_TABLE,
  CustomerContactSchema,
} from "../models/customerContact.model";

/** @type {import('sequelize-cli').Migration} */
export default {
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
