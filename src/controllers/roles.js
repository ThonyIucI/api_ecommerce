const { modelRoles, modelUsers } = require('../db')
 
const getRoles = async (req, res) => {
    try {
        const response = await modelRoles.findAll({
            include: modelUsers
        }, {raw: true})

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const createRole = async (req, res) => {
    const { name } = req.body

    try {
        const role = await modelRoles.findOne({where: {name}})
        if (role) return res.status(400).send({msg: `El rol ${name} ya existe en la base de datos.`})

        await modelRoles.create({
            name
        })

        res.status(200).send({msg: 'Rol creado con éxito.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const updateUserRole = async (req, res) => {
    const { userId: id } = req.params
    const { roleID } = req.body

    try {
        const user = await modelUsers.findByPk(id)
        if (!user) return res.status(400).send({msg: `El usuario ${id} nop existe en la base de datos.`})

        const role = await modelRoles.findByPk(roleID)
        if (!role) return res.status(400).send({msg: `El rol ${roleID} no existe en la base de datos.`})

        await user.setRole(roleID)

        res.status(200).send({msg: 'Rol de usuario actualizado correctamente.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

module.exports = {
    getRoles,
    createRole,
    updateUserRole
}