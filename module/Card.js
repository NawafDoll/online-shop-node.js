const mongoose = require("mongoose");

const cardDocument = new mongoose.Schema({
  userId: { type: String },
  productId: { type: String },
  name: { type: String },
  price: { type: Number },
  amount: { type: Number },
  date: {},
  image: { type: String },
});

module.exports = mongoose.model("card", cardDocument);
