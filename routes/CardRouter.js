const {
  createCard,
  getAllCards,
  deleteCard,
  updateAmount,
  totalPrice,
} = require("../controllers/CardController");
const protected = require("../Middilware/protected");

const joi = require("joi");
const { amountSchema } = require("../Schema/Cards");
const routerCard = require("express").Router();

routerCard.post(
  "/",
  async (req, res, next) => {
    try {
      const value = await amountSchema.card.validate(req.body);
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
  protected,
  updateAmount,
  createCard
);
routerCard.get("/all", protected, getAllCards);
routerCard.get("/total", protected, totalPrice);
routerCard.delete("/delete/:_id", protected, deleteCard);
module.exports = routerCard;
