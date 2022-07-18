const { DataTypes } = require('sequelize')

const Categories = sequelize => {
  const model = sequelize.define(
    'categories',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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

module.exports = Categories
