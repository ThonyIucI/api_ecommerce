const { DataTypes } = require('sequelize')

const Users = sequelize => {
  const model = sequelize.define(
    'users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      avatar_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      genre: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      adress: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  )

  return model
}

module.exports = Users
