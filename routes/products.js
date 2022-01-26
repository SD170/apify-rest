const express = require("express");

//importing controller function
const { getProducts } = require("../controllers/products.controller");

const router = express.Router();

router.route("/").get(getProducts);

module.exports = router;
