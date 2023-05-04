const { check } = require("express-validator");
const {
  createUser,
  login,
  forgetPasswordPost,
  forgetPasswordGet,
  updatePassword,
  getUserOne,
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
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
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
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
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
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  },
  updatePassword
);
module.exports = routerUser;
