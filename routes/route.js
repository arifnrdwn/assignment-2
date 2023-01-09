require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../middleware/jwt");
const fs = require("fs");

const router = express.Router();

router.post("/getToken", (req, res) => {
  const { user, password } = req.body;
  console.log(req.body);
  if (user != "admin" || password != "rahasia123") {
    return res.sendStatus(403);
  }
  var token = jwt.sign(
    {
      userId: 1,
      username: "admin",
      role: "ADMIN",
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "24h",
    }
  );
  res.send({ token });
});

const getDataProduct = fs.readFileSync("./data.json", "utf-8");

// console.log("data", getDataProduct);

router.get("/getData", authenticateJWT, (req, res) => {
  const { role } = req.user;
  console.log(role);
  if (role !== "ADMIN") {
    return res.sendStatus(403);
  }
  res.send(getDataProduct);
});

module.exports = router;
