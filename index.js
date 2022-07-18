require('dotenv').config()
const { lock } = require('./src/app.js')
const app = require('./src/app.js')
const { sequelize } = require('./src/db.js')

const { APP_PORT } = process.env

sequelize.sync({force: true}).then(() => {
    app.listen(APP_PORT, () => {
        console.log(`Server started port ${APP_PORT}`)
    })    
})