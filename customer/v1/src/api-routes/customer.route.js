const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/customer.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.post("/register", validate(validationSchema.registerSchema), customerController.register);
router.post("/login", validate(validationSchema.loginSchema), customerController.login);
router.get("/profile", authenticate, customerController.profile);

module.exports = router;
