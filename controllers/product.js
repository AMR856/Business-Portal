const Product = require('../models/product');

const postProduct = function postProduct(req, res) {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock
  });
  product.save().then((createdProduct) => {
    res.status(201).json({
      status: 'Success',
      createdProduct
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'Failed',
      error: err,
    });
  });
}

const getAllProducts = async function getAllProducts(_, res) {
  try {
    const productList = await Product.find();
    if (productList.length === 0) {
      return res.status(200).json({
        status: 'Sucesss',
        message: 'No products were added yet'
      });
    }
    res.status(200).send(productList);
  } catch(err) {
    res.status(500).json({
      status: 'Failed',
      error: err
    });
  }
}

module.exports = {getAllProducts, postProduct};
