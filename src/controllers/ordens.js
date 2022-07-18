const { modelOrdens, modelUsers, modelProducts, modelBrands, modelColors, modelGenders } = require("../db")

const getOrdens = async (req, res) => {
    try {
        const response = await modelOrdens.findAll({
            include: [modelUsers, modelProducts]
        },{raw: true})

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const createOrden = async (req, res) => {
    const { userId: id } = req.params
    const { details, price_total, amount_total } = req.body

    const updateStock = (arraySizes, size, amount) => {
        const obj = arraySizes.find(obj => obj.size === size)

        if (!obj) return false
        if (obj.stock === 0) return false
        if (obj.stock < amount) return false
        
        const index = arraySizes.indexOf(obj)
        arraySizes[index].stock -= amount

        return arraySizes
    }

    try {
        const user = await modelUsers.findByPk(id)
        if (!user) return res.status(400).send({msg: `El usuario ${id} no existe en la base de datos.`})

        const products = await Promise.all(details.map(obj => {
            return modelProducts.findByPk(obj.productID)
        }))
        if (!products) {
            return res.status(400).send({msg: 'Uno de los productos no están registrados en la base de datos.'})
        }

        let array = []

        for (let i = 0; i < details.length; i++) {
            const { size_range } = products[i]

            const modSizes = updateStock(size_range, details[i].size, details[i].amount)
            if (!modSizes) {
                return res.status(400).send({msg: `El producto ${products[i].id} de la talla ${details[i].size} no cuenta con el stock necesario (o no existe la talla) para generar esta orden.`})
            }
            
            array.push(modSizes)
        }
        
        array.forEach(async (obj, index) => {
            await modelProducts.update({size_range: obj}, {where: {id: products[index].id}})
        })

        const order = await modelOrdens.create({
            amount_total,
            price_total,
            details
        })

        let relProduct = details.map(obj => obj.productID)
        relProduct = [... new Set(relProduct)]

        order.setUser(id)
        order.setProducts(relProduct)
        
        res.status(200).send({msg: 'Orden creada con éxito.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const updateOrden = async (req, res) => {
    const { ordenId: id } = req.params
    const { state } = req.body

    const validateState = ["Cancelada", "En proceso", "Enviado", "Entregado"]

    try {
        if (!validateState.includes(state)) return res.status(400).json(validateState)

        const orden = await modelOrdens.findByPk(id)
        if (!orden) return res.status(400).send({msg: `No existe la orden ${id} en la base de datos.`})

        await modelOrdens.update({
            state
        }, {
            where: {id}
        })

        res.status(200).send({msg: 'Orden actualizada correctamente.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const getOrdensUser = async (req, res   ) => {
    const { userId: id } = req.params

    try {
        const user = await modelUsers.findByPk(id)
        if (!user) return res.status(200).send({msg: `No existe el usuario ${id} en la base de datos.`})

        const response = await modelUsers.findOne({
            where: {
                id
            },
            include: {
                model: modelOrdens,
                include: {
                    model: modelProducts,
                    include: [modelBrands, modelColors, modelGenders]
                }
            }
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

module.exports = {
    getOrdens,
    createOrden,
    updateOrden,
    getOrdensUser
}