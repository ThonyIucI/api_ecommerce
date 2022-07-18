require("dotenv").config();
const { Sequelize } = require("sequelize");

const Brands = require("./models/brands");
const Categories = require("./models/categories");
const Genders = require("./models/genders");
const Ordens = require("./models/ordens");
const Products = require("./models/products");
const Roles = require("./models/roles");
const Users = require("./models/users");
const Colors = require("./models/colors");
const Reviews = require("./models/reviews");
const ShopCart = require("./models/shopcart");
const Questions = require("./models/questions");

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  //CONFIGURACIÓN ADICIONAL PARA QUE CORRA EL BACK
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const modelBrands = Brands(sequelize);
const modelCategories = Categories(sequelize);
const modelGenders = Genders(sequelize);
const modelOrdens = Ordens(sequelize);
const modelProducts = Products(sequelize);
const modelRoles = Roles(sequelize);
const modelUsers = Users(sequelize);
const modelColors = Colors(sequelize);
const modelReviews = Reviews(sequelize);
const modelShopcart = ShopCart(sequelize);
const modelQuestions = Questions(sequelize);

modelProducts.belongsToMany(modelCategories, { through: "product_category" });
modelCategories.belongsToMany(modelProducts, { through: "product_category" });

modelProducts.belongsTo(modelBrands);
modelBrands.hasMany(modelProducts);

modelProducts.belongsTo(modelGenders);
modelGenders.hasMany(modelProducts);

modelProducts.belongsTo(modelColors);
modelColors.hasMany(modelProducts);

modelUsers.belongsTo(modelRoles);
modelRoles.hasMany(modelUsers);

modelOrdens.belongsTo(modelUsers);
modelUsers.hasMany(modelOrdens);

modelOrdens.belongsToMany(modelProducts, { through: "order_product" });
modelProducts.belongsToMany(modelOrdens, { through: "order_product" });

modelReviews.belongsTo(modelUsers);
modelUsers.hasMany(modelReviews);

modelReviews.belongsTo(modelProducts);
modelProducts.hasMany(modelReviews);

module.exports = {
  sequelize,
  modelBrands,
  modelCategories,
  modelGenders,
  modelOrdens,
  modelProducts,
  modelRoles,
  modelUsers,
  modelColors,
  modelReviews,
  modelShopcart,
  modelQuestions,
};
