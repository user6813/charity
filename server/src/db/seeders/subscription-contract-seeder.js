'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Subscription", [
      {
        interest_rate: 12,
        credit_limit: 100000,
        subscription_amount: 1000,
        term_cap: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        interest_rate: 18,
        credit_limit: 100000,
        subscription_amount: 500,
        term_cap: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        interest_rate: 6,
        credit_limit: 100000,
        subscription_amount: 1500,
        term_cap: 12,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
    await queryInterface.bulkInsert("Contract", [
      {
        per_amount: (10000 + (10000 * 12/100)) / 12,
        term_cap: 12,
        credit_payment: 10000,
        subscription_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (20000 + (20000 * 12/100)) / 12,
        term_cap: 12,
        credit_payment: 20000,
        subscription_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (30000 + (30000 * 12/100)) / 12,
        term_cap: 12,
        credit_payment: 30000,
        subscription_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (10000 + (10000 * 18/100)) / 12,
        term_cap: 12,
        credit_payment: 10000,
        subscription_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (20000 + (20000 * 18/100)) / 12,
        term_cap: 12,
        credit_payment: 20000,
        subscription_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (30000 + (30000 * 18/100)) / 12,
        term_cap: 12,
        credit_payment: 30000,
        subscription_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (10000 + (10000 * 6/100)) / 12,
        term_cap: 12,
        credit_payment: 10000,
        subscription_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (20000 + (20000 * 6/100)) / 12,
        term_cap: 12,
        credit_payment: 20000,
        subscription_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        per_amount: (30000 + (30000 * 6/100)) / 12,
        term_cap: 12,
        credit_payment: 30000,
        subscription_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Subscription", {});
    await queryInterface.dropTable("Contract", {});
  }
};
