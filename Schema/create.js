const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const createSchema = {
  user: joi.object({
    name: joi.string().min(3).max(15).not().empty(),
    email: joi.string().email().not().empty(),
    password: joiPassword
      .string()
      .min(5)
      .max(20)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1),
  }),
};

const loginSchema = {
  user: joi.object({
    email: joi.string().email().not().empty(),
    password: joiPassword
      .string()
      .min(5)
      .max(20)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1),
  }),
};

// { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }
module.exports = { createSchema, loginSchema };
