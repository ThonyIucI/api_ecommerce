const { DataTypes } = require("sequelize");
const { time } = process.env;
const Reviews = (sequelize) => {
  const model = sequelize.define(
    "reviews",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      updateAt: false,
    }
  );

  const preStart = () => {
    const json = require("../temporal-json/reviews.json");

    const { modelProducts, modelReviews } = require("../db");

    json.forEach(async (obj) => {
      const review = await modelReviews.create({
        comment: obj.comment,
        rating: obj.rating,
      });

      await review.setUser(obj.userId);
      await review.setProduct(obj.productId);

      const product = await modelProducts.findByPk(obj.productId);

      let reviews = await product.getReviews();
      await modelProducts.update(
        {
          rating: (reviews.length * obj.rating * 5) / 100,
        },
        {
          where: { id: obj.productId },
        }
      );
    });
  };

  setTimeout(preStart, time);

  return model;
};

module.exports = Reviews;
