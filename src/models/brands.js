const { DataTypes } = require('sequelize')

const Brands = sequelize => {
  const model = sequelize.define(
    'brands',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  )

  return model
}

module.exports = Brands
