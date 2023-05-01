const joi = require("joi");

const amountSchema = {
  card: joi.object({
    amount: joi.number().max(10).greater(0),
    name: joi.string().messages({ "string.empty": " must be login" }),
    price: joi.number(),
    image: joi.string(),
    date: joi.date(),
    productId: joi.string(),
  }),
};

module.exports = { amountSchema };
