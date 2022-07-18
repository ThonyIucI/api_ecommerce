const { DataTypes } = require("sequelize");

const Brands = (sequelize) => {
  const model = sequelize.define("brands",
    {
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

  const preStart = () => {
    const json = require("../temporal-json/brands.json");

    json.forEach(async (value) => {
      const { name } = value

      await model.findOrCreate({
        where: {
          name
        }
      });
    });
  };

  setTimeout(preStart, 3000);

  return model;
};

module.exports = Brands;
