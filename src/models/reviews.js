const { DataTypes } = require('sequelize')

const Reviews = sequelize => {
  const model = sequelize.define(
    'reviews',
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      updateAt: false,
    }
  )

  return model
}

module.exports = Reviews
