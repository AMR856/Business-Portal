const Product = require("../models/product");
const Category = require("../models/category");

const selectionStr = "name description brand price category rating _id";
const postProduct = async function postProduct(req, res) {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid Category",
      });
    }
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      dataCreated: req.body.dataCreated,
    });
    product = await product.save();
    res.status(201).json({
      status: "Success",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const getAllProducts = async function getAllProducts(req, res) {
  try {
    filter = {};
    if (req.query.categories) {
      filter = {category :req.query.categories.split(",")};
    }
    const productList = await Product.find(filter)
      .populate("category")
      .select(selectionStr);
    if (productList.length === 0) {
      return res.status(200).json({
        status: "Success",
        message: "No products with those categories",
      });
    }
    res.status(200).send(productList);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const getProduct = async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      res.status(200).json({
        status: "Success",
        product,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Product wasn't found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const updateProduct = async function updateProduct(req, res) {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid Category",
      });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dataCreated: req.body.dataCreated,
      },
      { new: true },
    );
    if (product) {
      res.status(201).json({
        status: "Success",
        product,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Product wasn't found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      error: err,
    });
  }
};

const deleteProduct = function deleteProduct(req, res) {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json({
          status: "Success",
          message: "Product was deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "Success",
          message: "Product wasn't found",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        error: err,
      });
    });
};

const getCount = async function getCount(_, res) {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({
      status: "Sucesss",
      count: productCount,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};

const isFeatured = async function isFeatured(req, res) {
  const { page = 0 } = req.query;
  const pageSize = 10;
  const skip = parseInt(page) * pageSize;
  try {
    const isFeaturedList = await Product.find({ isFeatured: true })
      .skip(skip)
      .limit(pageSize)
      .select(selectionStr);
    if (skip > isFeaturedList.length) {
      res.status(404).json({
        status: "Failed",
        message: "Out of the range",
      });
    }
    if (isFeaturedList.length === 0) {
      res.status(200).json({
        status: "Success",
        message: "There is no featured products",
      });
    }
    res.status(200).json({
      status: "Success",
      products: isFeaturedList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err,
    });
  }
};


module.exports = {
  getAllProducts,
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCount,
  isFeatured
};
