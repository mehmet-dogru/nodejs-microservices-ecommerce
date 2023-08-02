const httpStatus = require("http-status");
const customerService = require("../services/customer.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const { passwordToHash, generateAccessToken } = require("../scripts/utils/helper");

class CustomerController {
  async register(req, res, next) {
    try {
      const { email, password, phone } = req.body;

      const hash = passwordToHash(password);

      const customer = await customerService.create({ email, phone, password: hash });

      successResponse(res, httpStatus.CREATED, customer);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const hashedPassword = passwordToHash(password);

      const customer = await customerService.findOne({ email, password: hashedPassword });

      if (!customer) {
        return next(new ApiError("Invalid email or password", httpStatus.BAD_REQUEST));
      }

      const token = generateAccessToken(customer);
      successResponse(res, httpStatus.OK, token);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async profile(req, res, next) {
    try {
      const customer = await customerService.findOne({ _id: req.userId }).populate({
        path: "address",
      });
      if (!customer) {
        return next(new ApiError("Customer not found", httpStatus.BAD_REQUEST));
      }

      successResponse(res, httpStatus.OK, customer);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new CustomerController();
