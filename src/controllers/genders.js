const { modelGenders, modelProducts } = require('../db.js')

const getGenders = async (req, res) => {
    try {
        const response = await modelGenders.findAll({raw: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const createGender = async (req, res) => {
    const { name } = req.body

    try {
        const gender = await modelGenders.findOne({where: {name}}, {raw: true})
        if (gender) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelGenders.create({
            name
        })

        res.status(200).send({msg: 'Género creado correctamente.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const updateGender = async (req, res) => {
    const { genderId: id } = req.params
    const { name } = req.body

    try {
        const gender = await modelGenders.findByPk(id)
        if (!gender) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const exists = await modelGenders.findOne({where: {name}}, {raw: true})
        if (exists) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelGenders.update(
            { name },
            {
                where: {id}
            }
        )

        res.status(200).send({msg: 'Género actualizado.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const getProductsGender = async (req, res) => {
    const { genderId: id } = req.params

    try {
        const gender = await modelGenders.findByPk(id)
        if (!gender) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const response = await modelGenders.findOne({
            where: {
                id
            },
            include: {
                model: modelProducts
            }
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

module.exports = {
    getGenders,
    createGender,
    updateGender,
    getProductsGender
}