const { Router } = require('express')

const { getProducts, createProduct, productDetails, updateProduct } = require('../controllers/shoes')
const { getBrands, createBrand, updateBrand, getProductsBrand } = require('../controllers/brands')
const { getCategories, createCategory, updateCategory, getProductsCategory } = require('../controllers/categories')
const { getGenders, createGender, updateGender, getProductsGender } = require('../controllers/genders')
const { getColors, createColor, updateColor, getProductsColor } = require('../controllers/colors')
const { getRoles, createRole, updateUserRole } = require('../controllers/roles')
const { getQuestions, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/quetions')
const { getOrdens, createOrden, updateOrden, getOrdensUser } = require('../controllers/ordens')
const { getReviews, createReview, updateReview, getReviewsProduct, getReviewsUser } = require('../controllers/reviews')
const { getUsers, updateUser, getUserDetails, loginUser } = require('../controllers/users')
const { sendNotification } = require('../controllers/notification')

const routes = Router()

routes.get('/shoes', getProducts)
routes.post('/shoes', createProduct)
routes.put('/shoes/:productId', updateProduct)
routes.get('/productDetails/:productId', productDetails)

routes.get('/brands', getBrands)
routes.post('/brands', createBrand)
routes.put('/brands/:brandId', updateBrand)
routes.get('/productsBrand/:brandId', getProductsBrand)

routes.get('/categories', getCategories)
routes.post('/categories', createCategory)
routes.put('/categories/:categoryId', updateCategory)
routes.get('/productsCategory/:categoryId', getProductsCategory)

routes.get('/genders', getGenders)
routes.post('/genders', createGender)
routes.put('/genders/:genderId', updateGender)
routes.get('/productsGender/:genderId', getProductsGender)

routes.get('/colors', getColors)
routes.post('/colors', createColor)
routes.put('/colors/:colorId', updateColor)
routes.get('/productsColor/:colorId', getProductsColor)

routes.get('/questions', getQuestions)
routes.post('/questions', createQuestion)
routes.put('/questions/:id', updateQuestion)
routes.delete('/questions/:id', deleteQuestion)

routes.get('/roles', getRoles)
routes.post('/roles', createRole)
routes.put('/rolesUser/:userId', updateUserRole)

routes.get('/ordens', getOrdens)
routes.post('/ordens/:userId', createOrden)
routes.put('/ordens/:ordenId', updateOrden)
routes.get('/ordensUser/:userId', getOrdensUser)

routes.get('/reviews', getReviews)
routes.post('/reviews/:userId', createReview)
routes.put('/reviews/:reviewId', updateReview)
routes.get('/reviewsProduct/:productId', getReviewsProduct)
routes.get('/reviewsUser/:userId', getReviewsUser)

routes.get('/users', getUsers)
routes.put('/usersUpdate/:userId', updateUser)
routes.get('/userDetails/:userId', getUserDetails)
routes.post('/login', loginUser)

routes.post('/send-email', sendNotification)

module.exports = routes
