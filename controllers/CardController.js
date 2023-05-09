const card = require("../module/Card");
const jwt = require("jsonwebtoken");
module.exports = {
  createCard: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const user_id = jwt.decode(token);
      const addCard = await card.create({
        name: req.body.name,
        price: req.body.amount * req.body.price,
        date: new Date().toISOString().split("T")[0],
        amount: req.body.amount,
        userId: user_id.id,
        productId: req.body.productId,
        image: req.body.image,
      });
      if (addCard) {
        return res.status(200).json({ message: "Add to card" });
      } else {
        res.status(400).json({ message: "There Is Wrong" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllCards: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const userId = jwt.decode(token);

      const allCards = await card.find({ userId: userId.id });
      if (allCards) {
        let len = card.length;
        return res.status(200).json({ allCards: allCards, length: len });
      } else {
        return res
          .status(400)
          .json({ message: "You are not choose any Product" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteCard: async (req, res) => {
    try {
      const id = req.params._id;
      const delCard = await card.findByIdAndDelete(id);
      if (delCard) {
        return res.status(202).json({ message: "Deleted" });
      } else {
        return res.status(404).json({ message: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateAmount: async (req, res, next) => {
    const productId = req.body.productId;
    const amuntOld = await card.findOne({ productId: productId });
    if (amuntOld) {
      await card.findByIdAndUpdate(amuntOld.id, {
        amount: amuntOld.amount + +req.body.amount,
        price:
          +amuntOld.amount === 1
            ? amuntOld.price + +req.body.price
            : amuntOld.price * +req.body.amount,
      });
      return res.status(200).json({ message: "Add to card" });
    } else {
      next();
    }
  },
  totalPrice: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const userId = jwt.decode(token);
      // const userId = req.body.userId;
      const total = await card.find({ userId: userId.id });

      if (total) {
        let totalPrice = 0;
        total.map((e) => (totalPrice += +e.price));
        return res.status(200).json(totalPrice);
      } else {
        return res.status(400).json("Error");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
