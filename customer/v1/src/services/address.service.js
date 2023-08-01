const BaseService = require("./base.service");
const BaseModel = require("../models/Address");

class AddressService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new AddressService();
