const { DataTypes } = require('sequelize');
const { time } = process.env;

const Products = (sequelize)=>{
  const model = sequelize.define('products', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      nickname: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stock_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      size_range: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
      },
      material: {
        type: DataTypes.STRING
      },
      released: {
        type: DataTypes.STRING
      },
      designer: {
        type: DataTypes.STRING
      },
      details : {
        type: DataTypes.STRING,
        allowNull: false
      },
      shoe_condition: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      createdAt: false,
      updatedAt: false
    }
  )

  const preStart = async () => {
    const json = require('../temporal-json/api.json')

    json.sneakers.forEach(async (value) => {
      const { name, nickname, brand_name, story_html: description, retail_price_cents: price, original_picture_url: img, color, size_range, material, release_year: released, gender, designer, details, shoe_condition, category} = value

      const arraySizes = size_range.map(value => { return {size: value, stock: 10}})

      const product = await model.create({
        name,
        nickname: nickname,
        description: description.replace(/<\/?[^>]+(>|$)/g, ""),
        price,
        img,
        stock_total: arraySizes.reduce((a, value) => a+=value.stock, 0),
        size_range: arraySizes,
        material,
        released,
        designer,
        details,
        shoe_condition,
        rating: 5
      })
      
      const { modelCategories, modelBrands, modelColors, modelGenders } = require('../db')

      const mapCategories = category.map(async (value) => {
        const responseCategory = await modelCategories.findOne({
          where: {
            name: value
          }
        }, {raw: true})

        return responseCategory.id
      })

      const responseBrand = await modelBrands.findOne({
        where: {
          name: brand_name
        }
      }, {raw: true})

      const responseColor = await modelColors.findOne({
        where: {
          name: color
        }
      }, {raw: true})

      const responseGender = await modelGenders.findOne({
        where: {
          name: gender[0]
        }
      }, {raw: true})

      const { id: brandID } = responseBrand
      const { id: colorID } = responseColor
      const { id: genderID } = responseGender

      const categories = await Promise.all(mapCategories)
      product.setCategories(categories)

      product.setBrand(brandID)
      product.setColor(colorID)
      product.setGender(genderID)
    })
  }

  setTimeout(preStart, time)

  return model
};

module.exports = Products


