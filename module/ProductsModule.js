const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discription: { type: String, required: true },
  category: { type: String, required: true },
  // mount: { type: Number, required: true },
});

module.exports = mongoose.model("product", schemaProduct);
