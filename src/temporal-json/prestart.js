const { modelBrands, modelCategories, modelColors, modelGenders, modelOrdens, modelProducts, modelQuestions, modelReviews, modelRoles, modelUsers } = require('../db')

const preBrands = () => {
  const json = require('../temporal-json/brands.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelBrands.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preUsers = () => {
  const json = require('../temporal-json/users.json')

  json.forEach(async value => {
    const { dni, username, name, lastname, genre, email, phone, adress, country, avatar_url, rol } = value

    try {
      const user = await modelUsers.create({
        dni,
        username,
        name,
        lastname,
        genre,
        email,
        phone,
        adress,
        country,
        status: 'Active',
        avatar_url,
      })

      user.setRole(rol)
    } catch (error) {
      console.log(error)
    }
  })
}

const preCategories = async () => {
  const json = require('../temporal-json/categories.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelCategories.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preColors = async () => {
  const json = require('../temporal-json/colors.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelColors.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preGenders = () => {
  const json = require('../temporal-json/genders.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelGenders.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preProducts = async () => {
  const json = require('../temporal-json/api.json')

  json.sneakers.forEach(async value => {
    const {
      name,
      nickname,
      brand_name,
      story_html: description,
      retail_price_cents: price,
      original_picture_url: img,
      color,
      size_range,
      material,
      release_year: released,
      gender,
      designer,
      details,
      shoe_condition,
      category,
    } = value

    const arraySizes = size_range.map(value => {
      return { size: value, stock: 10 }
    })

    try {
      const product = await modelProducts.create({
        name,
        nickname: nickname,
        description: description.replace(/<\/?[^>]+(>|$)/g, ''),
        price,
        img,
        stock_total: arraySizes.reduce((a, value) => (a += value.stock), 0),
        size_range: arraySizes,
        material,
        released,
        designer,
        details,
        shoe_condition,
        rating: 5,
      })

      const mapCategories = category.map(async value => {
        const responseCategory = await modelCategories.findOne(
          {
            where: {
              name: value,
            },
          },
          { raw: true }
        )

        return responseCategory.id
      })

      const responseBrand = await modelBrands.findOne(
        {
          where: {
            name: brand_name,
          },
        },
        { raw: true }
      )

      const responseColor = await modelColors.findOne(
        {
          where: {
            name: color,
          },
        },
        { raw: true }
      )

      const responseGender = await modelGenders.findOne(
        {
          where: {
            name: gender[0],
          },
        },
        { raw: true }
      )

      const { id: brandID } = responseBrand
      const { id: colorID } = responseColor
      const { id: genderID } = responseGender

      const categories = await Promise.all(mapCategories)
      product.setCategories(categories)

      product.setBrand(brandID)
      product.setColor(colorID)
      product.setGender(genderID)
    } catch (error) {
      console.log(error)
    }
  })
}

const preQuestions = async () => {
  const json = require('../temporal-json/questions.json')

  json.forEach(async value => {
    const { question, answers } = value

    try {
      await modelQuestions.findOrCreate({
        where: {
          question,
          answers,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preReviews = () => {
  const json = require('../temporal-json/reviews.json')

  json.forEach(async obj => {
    try {
      const review = await modelReviews.create({
        comment: obj.comment,
        rating: obj.rating,
      })

      await review.setUser(obj.userId)
      await review.setProduct(obj.productId)

      const product = await modelProducts.findByPk(obj.productId)

      let reviews = await product.getReviews()
      await modelProducts.update(
        {
          rating: (reviews.length * obj.rating * 5) / 100,
        },
        {
          where: { id: obj.productId },
        }
      )
    } catch (error) {
      console.log(error)
    }
  })
}

const preRoles = () => {
  const json = require('../temporal-json/roles.json')

  json.forEach(async value => {
    const { name } = value

    await modelRoles.findOrCreate({
      where: {
        name,
      },
    })
  })
}

const preOrdens = () => {
  const json = require('../temporal-json/ordens.json')

  json.forEach(async value => {
    const { products, details, amount_total, price_total } = value

    try {
      const order = await modelOrdens.create({
        amount_total,
        price_total,
        details,
      })

      order.setUser(1)
      order.setProducts(products)
    } catch (error) {
      console.log(error)
    }
  })
}

setTimeout(preQuestions, 3000)
setTimeout(preBrands, 3000)
setTimeout(preCategories, 3000)
setTimeout(preColors, 3000)
setTimeout(preGenders, 3000)
setTimeout(preRoles, 3000)
setTimeout(preProducts, 6000)
setTimeout(preUsers, 6000)
setTimeout(preOrdens, 10000)
setTimeout(preReviews, 10000)
