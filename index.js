require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
