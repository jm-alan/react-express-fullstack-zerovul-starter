'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, { DataTypes, fn }) => {
  class RosterEntry extends Model {
    static associate (models) {
      RosterEntry.belongsTo(models.User, { foreignKey: 'userId' });
      RosterEntry.belongsTo(models.Communal, { foreignKey: 'communalId' });
    }
  }
  RosterEntry.init({
    communeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
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
    modelName: 'RosterEntry'
  });
  return RosterEntry;
};
