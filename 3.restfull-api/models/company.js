'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.company.hasMany(models.employee, { foreignKey: 'company_id' });
    }
  }
  company.init({
    company_name: DataTypes.STRING,
    telephone_number: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    address: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'company',
  });
  return company;
};