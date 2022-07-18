const { DataTypes } = require('sequelize')

const Ordens = sequelize => {
  const model = sequelize.define('ordens', {
    amount_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    details: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'En proceso',
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  })

  return model
}

module.exports = Ordens
