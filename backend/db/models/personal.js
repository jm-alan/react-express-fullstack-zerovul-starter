'use strict';
const {
  Model, ValidationErrorItem, ValidationError
} = require('sequelize');
module.exports = (sequelize, { DataTypes, fn }) => {
  class Personal extends Model {
    static associate (models) {
      Personal.belongsTo(models.User, { foreignKey: 'ownerId' });
      Personal.hasMany(models.Item, {
        foreignKey: 'accountId',
        constraints: false,
        scope: {
          accountType: 'Personal'
        }
      });
    }
  }
  Personal.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set (value) {
        const errors = [];
        if (value.match(/^\s/)) errors.push(new ValidationErrorItem('Account name cannot begin with a space'));
        if (!value.match(/^[a-zA-Z0-9-_ ]+$/)) errors.push(new ValidationErrorItem('Account name may only contain the letters A-Z, the numbers 0-9, hyphens, underscores, or spaces..'));
        if (!(value.length && value.length <= 100)) errors.push(new ValidationErrorItem('Account name must be between 1 and 100 characters'));
        if (errors.length) throw new ValidationError('Invalid account name', errors);
        this.setDataValue('name', value);
      }
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      set (value) {
        if (!value.toString().match(/^[0-9]+\.?[0-9]{2}?$/)) throw new ValidationError('Account balance must be a number.');
        if (!value.toString().match(/^[0-9]{1,16}/)) throw new ValidationError('Account starting balance must be less than 10 quadrillion dollars.');
        this.setDataValue('balance', value);
      }
    },
    ownerId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    }
  }, {
    sequelize,
    modelName: 'Personal'
  });
  return Personal;
};
