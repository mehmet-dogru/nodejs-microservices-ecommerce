const Joi = require("joi");

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet." +
    " At least one lower case alphabet." +
    " At least one digit. At least one special character." +
    "Minimum eight in length"
);

const phoneRegex = /^(?:\+90|0)(\d{10})$/;

const registerSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().regex(RegExp(pattern)).error(stringPassswordError).required(),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": "Geçerli bir Türkiye telefon numarası giriniz örnek: +905555555555",
  }),
  passwordConfirm: Joi.any().valid(Joi.ref("password")).required().label("Confirm password").messages({ "any.only": "{{#label}} does not match" }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
