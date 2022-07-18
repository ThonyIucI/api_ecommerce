const { modelCategories, modelProducts } = require('../db.js')

const getCategories = async (req, res) => {
    try {
        const response = await modelCategories.findAll({raw: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.'})
    }
}

const createCategory = async (req, res) => {
    const { name } = req.body

    try {
        const category = await modelCategories.findOne({where: {name}}, {raw: true})
        if (category) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

        await modelCategories.create({
            name
        })

        res.status(200).send({msg: 'Categoría creada correctamente.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.'})
    }
}

const updateCategory = async (req, res) => {
    const { categoryId: id } = req.params
    const { name } = req.body

    try {
        const category = await modelCategories.findByPk(id)
        if (!category) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})
        
        const exists = await modelCategories.findOne({where: {name}}, {raw: true})
        if (exists) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`}) 

        await modelCategories.update(
            { name },
            {
                where: {id}
            }
        )

        res.status(200).send({msg: 'Categoría actualizada.'}) 
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.'})
    }
}

const getProductsCategory = async (req, res) => {
    const { categoryId: id } = req.params

    try {
        const category = await modelCategories.findByPk(id)
        if (!category) return res.status(400).send({msg: `No existe ${id} en la base de datos.`})

        const response = await modelCategories.findOne({
            where: { id },
            include: {
                model: modelProducts
            }
        })

        res.status(200).json(response) 
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.'})
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    getProductsCategory
}