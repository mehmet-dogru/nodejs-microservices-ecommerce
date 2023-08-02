const Joi = require("joi");

const addressCreateSchema = Joi.object().keys({
  street: Joi.string().required(),
  postalCode: Joi.string(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

module.exports = { addressCreateSchema };
