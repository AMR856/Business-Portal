const express = require("express");
const router = express.Router();
const { postProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getCount, isFeatured } = require("../controllers/product");

router.post("/", postProduct);
router.get("/", getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/get/count', getCount);
router.get('/get/isFeatured', isFeatured);
module.exports = router;
