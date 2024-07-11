const express = require("express");
const router = express.Router();
const { postProduct, getAllProducts } = require("../controllers/product");

router.post("/", postProduct);
router.get("/", getAllProducts);

module.exports = router;
