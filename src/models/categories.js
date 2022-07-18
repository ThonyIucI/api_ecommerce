const { DataTypes } = require("sequelize");
const { time } = process.env;

const Categories = (sequelize) => {
  const model = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );

  const preStart = async () => {
    const json = require("../temporal-json/categories.json");

    json.forEach(async (value) => {
      const { name } = value;

      await model.findOrCreate({
        where: {
          name,
        },
      });
    });
  };

  setTimeout(preStart, time);

  return model;
};

module.exports = Categories;
