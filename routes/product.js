const express = require('express');
const router = express.Router();
const {postProduct, getAllProducts} = require('../controllers/product');

router.post('/products', postProduct);
router.get('/products', getAllProducts);

module.exports = router;
