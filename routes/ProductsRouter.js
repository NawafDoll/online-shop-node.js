const { create, show, showById } = require("../controllers/ProductsController");
const { getUserOne } = require("../controllers/UsersController");
const protected = require("../Middilware/protected");
const routerProduct = require("express").Router();

routerProduct.post("/create", protected, getUserOne, create);
routerProduct.get("/", protected, show);
routerProduct.get("/:_id", showById);
module.exports = routerProduct;
