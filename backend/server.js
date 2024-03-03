const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const { handleSpam, authVerify} = require("./middlewares/authMiddleware");
require("dotenv").config();

/* Static variables for configurations. */
const PORT = process.env.PORT || 5500;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

/* Connection to the database.*/
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Server has been connected to the MongoDB successfully."))
  .catch((err) => console.error("There is an error occured while connectin to the MongoDB:\n", err));

/* Middlewares */
app.use(express.json());
app.use("/", routes);
app.use("/register",handleSpam);
app.use("/login",handleSpam);
app.use("*",authVerify)

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}.`);
});
