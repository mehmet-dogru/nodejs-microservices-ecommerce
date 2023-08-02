const express = require("express");
const router = express.Router();

const addressController = require("../controllers/address.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/address.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.post("/", authenticate, validate(validationSchema.addressCreateSchema), addressController.create);

module.exports = router;
