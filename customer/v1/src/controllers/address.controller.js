const httpStatus = require("http-status");
const addressService = require("../services/address.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const customerService = require("../services/customer.service");

class AddressController {
  async create(req, res, next) {
    try {
      const customer = await customerService.findById(req.userId);

      const newAddress = await addressService.create({ ...req.body });

      if (customer) {
        customer.address.push(newAddress);
        await customer.save();
        successResponse(res, httpStatus.OK, newAddress);
      } else {
        return next(new ApiError("Customer not found", httpStatus.BAD_REQUEST));
      }
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new AddressController();
