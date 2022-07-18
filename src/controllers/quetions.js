const { modelQuestions } = require('../db.js')

const getQuestions = async (req, res) => {
    try {
        const response = await modelQuestions.findAll({raw: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({msg: 'Error internal server', error})
    }
}

const createQuestion = (req, res) => {
    const { question , answers} = req.body

    try {
        const product = modelQuestions.create({
            question,
            answers
        })

        res.status(200).send({msg: 'question created successfully!'})
    } catch (error) {
        res.status(500).send({msg: 'Error internal server', error})
    }
}

const updateQuestion = () => {}

const deleteQuestion = async (req, res) => {
    const { id } = req.params

    try {
        const question = await modelQuestions.destroy({
            where: {
                id
            }
        })
        
        res.status(200).send({msg: 'Removed  question successfully'})
    } catch (error) {
        res.status(500).send({msg: 'Error internal server', error})
    }
}

module.exports = {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
}