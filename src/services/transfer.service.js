const Transfer = require("../models/tranfer.model");

class TransferService {
  async create(transferDate) {
    try {
      return await Transfer.create(transferDate);
    } catch (error) {
      throw Error("Somenthing went very wrong!");
    }
  }
}

module.exports = TransferService;
