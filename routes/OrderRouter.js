const { postOrder, getOrder } = require("../controllers/OrdersController");

const routerOrder = require("express").Router();

routerOrder.post("/", postOrder);
routerOrder.get("/", getOrder);

module.exports = routerOrder;
