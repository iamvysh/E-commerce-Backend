const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

const products = mongoose.model("products", productSchema);

module.exports = products;
