require("dotenv").config();
const { lock } = require("./src/app.js");
const app = require("./src/app.js");
const { sequelize } = require("./src/db.js");

const { PORT } = process.env;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started port ${PORT}`);
  });
});
