const { DataTypes } = require('sequelize')

const Products = sequelize => {
  const model = sequelize.define(
    'products',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size_range: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      material: {
        type: DataTypes.STRING,
      },
      released: {
        type: DataTypes.STRING,
      },
      designer: {
        type: DataTypes.STRING,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shoe_condition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  )

  return model
}

module.exports = Products
