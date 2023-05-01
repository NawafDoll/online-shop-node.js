const joi = require("joi");
const validates = (schema) => {
  async (req, res, next) => {
    try {
      const value = await schema.validate(req.body);
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
  };
};

module.exports = validates;
