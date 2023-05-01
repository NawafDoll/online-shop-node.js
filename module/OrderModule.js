const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String },
  date: {},
  total: { type: Number },
  status: { type: String },
});

module.exports = mongoose.model("orders", orderSchema);
