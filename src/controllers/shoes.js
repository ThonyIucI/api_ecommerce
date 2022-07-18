const { exists } = require('fs')
const { modelProducts, modelColors, modelBrands, modelCategories, modelGenders, sequelize } = require('../db.js')

const getProducts = async (req, res) => {
  try {
    const response = await modelProducts.findAll({
      include: [modelCategories, modelBrands, modelColors, modelGenders]
    }, {raw: true})
    
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

const createProduct = async (req, res) => {
  const { name, nickname, description, price, img, size_range, material, released, designer, details, shoe_condition, rating, categories = [], brandID, colorID, genderID } = req.body

  try {
    const existsName = await modelProducts.findOne({where: {name}}, {raw: true})
    if (existsName) return res.status(400).send({msg: `Ya existe ${name} en la base de datos.`})

    const existsCategory = await Promise.all(categories.map(value => modelCategories.findByPk(value)))
    const existsColor = await modelColors.findByPk(colorID)
    const existsBrand = await modelBrands.findByPk(brandID)
    const existsGender = await modelGenders.findByPk(genderID)

    if (!existsCategory || !existsColor || !existsBrand || !existsGender) {
      return res.status(400).send({msg: 'Error al intentar relacionar un producto con una (categoría, color, marca, género) que no existe en la base de datos.'})
    }

    const product = await modelProducts.create({
      name,
      nickname: !nickname ? name : nickname,
      description,
      price,
      img,
      stock_total: size_range.reduce((a, value) => a+=value.stock, 0),
      size_range,
      material,
      released,
      designer,
      details,
      shoe_condition,
      rating
    })

    await product.setCategories(categories)
    await product.setBrand(brandID)
    await product.setColor(colorID)
    await product.setGender(genderID)

    res.status(200).send({ msg: 'Producto creado con éxito.', product})
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error})
  }
}

const productDetails = async (req, res) => {
  const { productId: id } = req.params

  try {
    const response = await modelProducts.findOne({
      where: {
        id
      },
      include: [modelCategories, modelBrands, modelColors, modelGenders]
    }, {raw: true})

    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

const updateProduct = async (req, res) => {
  const { productId: id } = req.params
  const { propertys, categories, color, brand, gender } = req.body

  try {
    const product = await modelProducts.findByPk(id)
    if (!product) return res.status(400).send({msg: `El producto ${id} no existe en la base de datos.`})

    await modelProducts.update(
      propertys,
      {
        where: {
          id
        }
      }
    )

    if (categories) {
      const existsCategory = await Promise.all(categories.map(value => modelCategories.findByPk(value)))
      if (!existsCategory) return res.status(400).send({msg: 'El producto fué actualizado pero sus relaciones no.'})
      product.setCategories(categories)
    }

    if (color) {
      const existsColor = await modelColors.findByPk(color)
      if (!existsColor) return res.status(400).send({msg: 'El producto fué actualizado pero sus relaciones no.'})
      product.setColor(color)
    }

    if (brand) {
      const existsBrand = await modelBrands.findByPk(brand)
      if (!existsBrand) return res.status(400).send({msg: 'El producto fué actualizado pero sus relaciones no.'})
      product.setBrand(brand)
    }

    if (gender) {
      const existsGender = await modelGenders.findByPk(genderID)
      if (!existsGender) return res.status(400).send({msg: 'El producto fué actualizado pero sus relaciones no.'})
      product.setGender(gender)
    }
  
    res.status(200).send({msg: `El producto ${id} fué actualizado correctamente.`})
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

module.exports = {
  getProducts,
  createProduct,
  productDetails,
  updateProduct
}
