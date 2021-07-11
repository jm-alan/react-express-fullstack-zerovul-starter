'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, { DataTypes, fn }) => {
  class Item extends Model {
    async getAccount (options) {
      return await this[`get${this.accountType}`](options);
    }

    static associate (models) {
      Item.belongsTo(models.Personal, {
        foreignKey: 'accountId',
        constraints: false
      });
      Item.belongsTo(models.Communal, {
        foreignKey: 'accountId',
        constraints: false
      });
      Item.belongsTo(models.User, { foreignKey: 'ownerId' });
      Item.addHook('afterFind', res => {
        if (!Array.isArray(res)) res = [res];
        for (const item of res) item.Account = item.Personal || item.Communal;
      });
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    income: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    details: DataTypes.TEXT,
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
    modelName: 'Item'
  });
  return Item;
};
