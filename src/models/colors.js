const { DataTypes } = require('sequelize')

const Colors = sequelize => {
  const model = sequelize.define(
    'colors',
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

module.exports = Colors
