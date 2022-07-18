const { DataTypes } = require('sequelize')

const ShoppingCart = (sequelize) => {
    const model = sequelize.define('shopping_cart', {})

    return model
}

module.exports = ShoppingCart