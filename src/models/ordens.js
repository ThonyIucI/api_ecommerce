const { DataTypes } = require('sequelize');

const Ordens = (sequelize) => {
    const model = sequelize.define('ordens', {
        amount_total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price_total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        details: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'En proceso'
        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })

    const preStart = () => {
        const json = require('../temporal-json/ordens.json')

        json.forEach(async (value) => {
            const {products, details, amount_total, price_total} = value

            const order = await model.create({
                amount_total,
                price_total,
                details
            })
    
            order.setUser(1)
            order.setProducts(products)
        })
    }

    setTimeout(preStart, 6000)

    return model
}

module.exports = Ordens
