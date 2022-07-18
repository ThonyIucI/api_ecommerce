const { DataTypes } = require('sequelize')
const {time}=process.env
const Users = (sequelize) => {
    const model = sequelize.define('users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        avatar_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        genre: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
        },
        adress: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            createdAt: false,
            updatedAt: false
        }
    )

    const preStart = () => {
        const json = require('../temporal-json/users.json')
        
        json.forEach(async (value) => {
            const { dni, username, name, lastname, genre, email, phone, adress, country, avatar_url, rol } = value

            const user = await model.create({
                dni, 
                username,
                name,
                lastname,
                genre,
                email,
                phone,
                adress,
                country,
                status: 'Active',
                avatar_url
            })

            user.setRole(rol)
        })

    }

    setTimeout(preStart, time)

    return model
}

module.exports = Users