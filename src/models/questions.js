const { DataTypes } = require('sequelize')

const Questions = sequelize => {
  const model = sequelize.define(
    'questions',
    {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answers: {
        type: DataTypes.TEXT,
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

module.exports = Questions
