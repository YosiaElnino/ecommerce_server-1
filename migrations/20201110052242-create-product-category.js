'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product_Categories');
  }
};