'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.employee.belongsTo(models.company, { foreignKey: 'company_id' });
    }
  }
  employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    jobtitle: DataTypes.ENUM('manager', 'director', 'staff'),
    company_id: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'employee',
  });
  return employee;
};