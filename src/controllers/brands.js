const { modelBrands, modelProducts } = require('../db.js')

const getBrands = async (req, res) => {
    try {
        const response = await modelBrands.findAll({raw: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor', error})
    }
}

const createBrand = async (req, res) => {
    const { name } = req.body

    try {
        const brand = await modelBrands.findOne({where: {name}}, {raw: true})
        if (brand) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelBrands.create({
            name
        })

        res.status(200).send({msg: 'Marca creada correctamente.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor', error})
    }
}

const updateBrand = async (req, res) => {
    const { brandId: id } = req.params
    const { name } = req.body

    try {
        const brand = await modelBrands.findByPk(id)
        if (!brand) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const exists = await modelBrands.findOne({where: {name}}, {raw: true})
        if (exists) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelBrands.update(
            { name },
            {
                where: {id}
            }
        )

        res.status(200).send({msg: 'Marca actualizada.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor', error})
    }
}

const getProductsBrand = async (req, res) => {
    const { brandId: id } = req.params

    try {
        const brand = await modelBrands.findByPk(id)
        if (!brand) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const response = await modelBrands.findOne({
            where: {
                id
            },
            include: {
                model: modelProducts
            }
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor', error})
    }
}

module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    getProductsBrand
}