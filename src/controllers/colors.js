const { modelColors, modelProducts } = require('../db')

const getColors = async (req, res) => {
    try {
        const response = await modelColors.findAll({raw: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.'})
    }
}

const createColor = async (req, res) => {
    const { name } = req.body

    try {
        const color = await modelColors.findOne({where: {name}}, {raw: true})
        if (color) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelColors.create({
            name
        })

        res.status(200).send({msg: 'Color creado correctamente.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const updateColor = async (req, res) => {
    const { colorId: id } = req.params
    const { name } = req.body

    try {
        const color = await modelColors.findByPk(id)
        if (!color) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const exists = await modelColors.findOne({where: {name}}, {raw: true})
        if (exists) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelColors.update(
            { name },
            {
                where: {id}
            }
        )

        res.status(200).send({msg: 'Color actualizado.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const getProductsColor = async (req, res) => {
    const { colorId: id } = req.params

    try {
        const color = await modelColors.findByPk(id)
        if (!color) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const response = await modelColors.findOne({
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
    getColors,
    createColor,
    updateColor, 
    getProductsColor
}