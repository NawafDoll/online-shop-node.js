const product = require("../module/ProductsModule");
const user = require("../module/UsersModule");
const jwt = require("jsonwebtoken");
module.exports = {
  create: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const userId = jwt.decode(token);

      const findUser = await user.findOne({ isAdmin: true });
      if (findUser) {
        const addProduct = await product.create({
          name: req.body.name,
          image: req.body.image,
          price: req.body.price,
          discription: req.body.discription,
          category: req.body.category,
        });
        if (addProduct) {
          res.status(201).json({ message: "Add new product" });
        }
      } else {
        res.status(400);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Server Error" });
    }
  },
  show: async (req, res) => {
    try {
      const category = req.query.category;
      const categoryProducts = await product.find({ category: category });
      const allProducts = await product.find({});
      if (category === undefined || category === "all" || category === "") {
        return res.status(200).json(allProducts);
      } else {
        return res.status(200).json(categoryProducts);
      }
    } catch (err) {
      console.log(err);
    }
  },
  showById: async (req, res) => {
    try {
      const _id = req.params._id;
      const productOne = await product.findById(_id);
      if (productOne) {
        return res.status(200).json(productOne);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
