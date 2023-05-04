const { check } = require("express-validator");
const {
  createUser,
  login,
  forgetPasswordPost,
  forgetPasswordGet,
  updatePassword,
  getUserOne,
  userAdmin,
} = require("../controllers/UsersController");

const { user, createSchema, loginSchema } = require("../Schema/create");
const routerUser = require("express").Router();

routerUser.post(
  "/",
  async (req, res, next) => {
    try {
      const value = await createSchema.user.validate(req.body);
      if (value.error) {
        return res.json({
          success: 0,
          message: value.error.details[0].message,
        });
      }
    } catch (err) {
      console.log(err);
      next();
    }
  },
  createUser
);
routerUser.get("/", userAdmin);
routerUser.post(
  "/login",
  async (req, res, next) => {
    try {
      const value = await loginSchema.user.validate(req.body);
      if (value.error) {
        return res.json({
          success: 0,
          message: value.error.details[0].message,
        });
      }
    } catch (err) {
      console.log(err);
      next();
    }
  },
  login
);
routerUser.post("/forgetpassword", forgetPasswordPost);
routerUser.get("/forgetpassword/:id/:token", forgetPasswordGet);
routerUser.post(
  "/forgetpassword/:id/:token",
  async (req, res, next) => {
    try {
      const value = await loginSchema.user.validate(req.body);
      if (value.error) {
        return res.json({
          success: 0,
          message: value.error.details[0].message,
        });
      }
    } catch (err) {
      console.log(err);
      next();
    }
  },
  updatePassword
);
module.exports = routerUser;
