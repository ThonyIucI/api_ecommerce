const { DataTypes } = require("sequelize");
const { time } = process.env;

const Colors = (sequelize) => {
  const model = sequelize.define(
    "colors",
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

  const preStart = async () => {
    const json = require("../temporal-json/colors.json");

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

module.exports = Colors;
