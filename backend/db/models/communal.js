'use strict';
const {
  Model, ValidationErrorItem, ValidationError
} = require('sequelize');
module.exports = (sequelize, { DataTypes, fn }) => {
  class Communal extends Model {
    static associate (models) {
      Communal.hasMany(models.RosterEntry, { foreignKey: 'communalId' });
      Communal.belongsToMany(models.User, {
        through: models.RosterEntry,
        foreignKey: 'communalId',
        otherKey: 'userId'
      });
      Communal.hasMany(models.Item, {
        foreignKey: 'accountId',
        constraints: false,
        scope: {
          accountType: 'Communal'
        }
      });
    }
  }
  Communal.init({
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
    modelName: 'Communal'
  });
  return Communal;
};
