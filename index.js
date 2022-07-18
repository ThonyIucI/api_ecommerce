require("dotenv").config();
const { lock } = require("./src/app.js");
const app = require("./src/app.js");
const { sequelize } = require("./src/db.js");

const PORT_B = process.env.PORT || 3001;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT_B, () => {
    console.log(`Server started port ${PORT_B}`);
  });
});
