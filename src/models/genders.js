const { DataTypes } = require('sequelize')

const Genders = sequelize => {
  const model = sequelize.define(
    'genders',
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

module.exports = Genders
