const { modelReviews, modelUsers, modelProducts } = require("../db")

const getReviews = async (req, res) => {
    try {
        const response = await modelReviews.findAll({
            include: [modelUsers, modelProducts]
        }, {raw: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const createReview = async (req, res) => {
    const { userId: id} = req.params
    const { productId, comment, rating } = req.body

    try {
        const user = await modelUsers.findByPk(id)
        if (!user) return res.status(400).send({msg: `El usuario ${id} no existe en la base de datos.`})

        const product = await modelProducts.findByPk(productId)
        if (!product) return res.status(400).send({msg: `El producto ${id} no existe en la base de datos.`})

        const review = await modelReviews.create({
            comment, rating
        })

        await review.setUser(id)
        await review.setProduct(productId)

        let reviews = await product.getReviews()
        await modelProducts.update({
            rating: ((reviews.length * rating) * 5) / 100
        }, {
            where: {id: productId}
        })

        res.status(200).send({msg: 'Review creada con éxito.'})
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const updateReview = () => {}

const getReviewsProduct = async (req, res) => {
    const { productId: id } = req.params

    try {
        const response = await modelProducts.findByPk(id, {
            include: [{
                model: modelReviews,
                include: modelUsers
            }]
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

const getReviewsUser = async (req, res) => {
    const { userId: id } = req.params

    try {
        const response = await modelUsers.findByPk(id, {
            include: [{
                model: modelReviews,
                include: modelProducts
            }]
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error interno del servidor.', error})
    }
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    getReviewsProduct,
    getReviewsUser
}