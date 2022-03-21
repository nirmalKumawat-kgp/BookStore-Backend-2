require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const errorHandler = require("./middleware/error");
global.__basedir = __dirname;

const models = require("./models");
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/cart", require("./routes/cart"));
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  models.sequelize
    .sync()
    .then(() => {
      // Logging after promise resolve
      console.log("Main DB sequelized\n");
    })
    .catch((err) => {
      // logging if there is any error while sequelizing
      console.log(err.message);
    });
});
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => {
    process.exit(1);
  });
});
