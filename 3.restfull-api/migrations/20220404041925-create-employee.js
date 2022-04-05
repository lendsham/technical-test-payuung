'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING(16),
        defaultValue: null
      },
      jobtitle: {
        allowNull: false,
        type: Sequelize.ENUM('manager', 'director', 'staff'),
        defaultValue: 'staff'
      },
      company_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10),
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};