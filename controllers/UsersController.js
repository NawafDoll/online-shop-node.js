const users = require("../module/UsersModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  createUser: async (req, res, next) => {
    try {
      const email = req.body.email;
      const checkUser = await users.findOne({ email: email });
      if (checkUser) {
        return res
          .status(400)
          .json({ message: "This email is already registred" });
      } else {
        const pass = await bcrypt.hash(req.body.password, 10);
        const addUser = await users.create({
          name: req.body.name,
          email: req.body.email,
          password: pass,
        });
        if (addUser)
          return res.status(200).json({ message: `Welcome ${addUser.name}!` });
      }
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const pass = req.body.password;
      const checkUser = await users.findOne({ email: email });
      if (!checkUser) {
        return res.status(400).json({ message: "Email is not there" });
      }

      const checkPass = await bcrypt.compare(pass, checkUser.password);
      if (!checkPass) {
        return res.status(400).json({ message: `Password Error` });
      }
      const token = jwt.sign(
        { id: checkUser._id, name: checkUser.name, isAdmin: checkUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      // console.log(checkUser.isAdmin);
      return res
        .status(200)
        .json({ message: `Welcome back ${checkUser.name}`, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getUserOne: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const userAdmin = jwt.decode(token);
      if (!userAdmin.isAdmin) {
        return res.status(404).json({ message: "You are not admin" });
      }
      next();
    } catch (err) {
      console.log(err);
    }
  },
  userAdmin: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const user = jwt.decode(token);
      const findUser = await users.findOne({ isAdmin: true });
      if (findUser) {
        return res.status(200).json({ isAdmin: user.isAdmin });
      }
      return res.status(400);
    } catch (err) {
      console.log(err);
    }
  },
  forgetPasswordPost: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await users.findOne({ email: email });
      if (!user) {
        return res.json({ message: "Email Not There" });
      }

      const secret = process.env.JWT_SECRET + user.password;
      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: "10m",
      });
      const link = `http://localhost:3322/user/forgetpassword/${user.id}/${token}`;
      // console.log(link);
      return res.status(200).json({ resetPass: link });
    } catch (err) {
      console.log(err);
    }
  },

  forgetPasswordGet: async (req, res) => {
    const { id, token } = req.params;
    // res.json(req.params);
    const user = await users.findOne({ _id: id });
    if (!user) {
      return res.json({ message: "Email Not There" });
    }
    const secret = process.env.JWT_SECRET + user.password;
    try {
      const verify = jwt.verify(token, secret);
      return res.json({ message: " Verified", id: id, token: token });
    } catch (err) {
      res.json({ message: "Not Verify" });
    }
  },
  updatePassword: async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const user = await users.findOne({ _id: id });
    if (!user) {
      return res.json({ message: "Email Not There" });
    }
    const secret = process.env.JWT_SECRET + user.password;
    try {
      const verify = jwt.verify(token, secret);
      const pass = await bcrypt.hash(password, 10);
      await users.findByIdAndUpdate(id, { password: pass });
      res.status(200).json({ message: "Changed Password" });
    } catch (err) {
      res.json({ message: "Not Verify" });
    }
  },
};
