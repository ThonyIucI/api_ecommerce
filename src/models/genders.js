const { DataTypes } = require('sequelize')

const Genders = (sequelize) => {
    const model = sequelize.define('genders', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },  {
            createdAt: false,
            updatedAt: false
        }
    )

    const preStart = () => {
        const json = require('../temporal-json/genders.json')

        json.forEach(async (value) => {
            const { name } = value

            await model.findOrCreate({
                where: {
                    name
                }
            })
        })
    }

    setTimeout(preStart, 3000)

    return model
}

module.exports = Genders