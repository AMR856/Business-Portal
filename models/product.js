const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required : [true, 'Name is a required field'],
    unique : true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  countInStock: {
    type: Number,
    required : [true, 'Count is a required field']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
