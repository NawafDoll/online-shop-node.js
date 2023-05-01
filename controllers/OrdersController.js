const order = require("../module/OrderModule");
const jwt = require("jsonwebtoken");
module.exports = {
  postOrder: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const user_id = jwt.decode(token);
      if (req.body.total == 0) {
        return res.status(400).json({ message: "Not any Order" });
      }
      const createOrder = await order.create({
        userId: user_id.id,
        total: req.body.total,
        date: new Date().toISOString().split("T")[0],
        status: "Progress...",
      });
      if (createOrder) {
        return res.status(200).json({ message: "Add to orders" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getOrder: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const user_id = jwt.decode(token);
      const orders = await order.find({ userId: user_id.id });
      if (orders) {
        return res.status(200).json(orders);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
