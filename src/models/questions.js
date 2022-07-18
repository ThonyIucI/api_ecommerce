const { DataTypes } = require('sequelize');

const Questions = (sequelize)=>{
  const model = sequelize.define('questions', {
      question: {
        type: DataTypes.STRING,
        allowNull: false
      },
      answers: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      createdAt: false,
      updatedAt: false
    }
  )

  const preStart = async () => {
    const json = require('../temporal-json/questions.json')

    json.forEach(async (value) => {
      const { question, answers} = value

      await model.findOrCreate({
        where: {
          question,
          answers
        }
      })
    })
  }

  setTimeout(preStart, 3000)

  return model
};

module.exports = Questions


