const { DataTypes } = require("sequelize");
const { time } = process.env;

const Roles = (sequelize) => {
  const model = sequelize.define(
    "roles",
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
    const json = require("../temporal-json/roles.json");

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

module.exports = Roles;
