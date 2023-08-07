const User = require("../models/user.model");
const UserService = require("../services/user.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const TransferService = require("../services/transfer.service");
const transferService = new TransferService();
const userService = new UserService();
exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, accountNumberTransfer, accountNumberReceiver } = req.body;

  if (accountNumberReceiver === accountNumberTransfer) {
    return next(new AppError("The sender account cannot be the same account"));
  }
  const sendingUser = await userService.findOne(accountNumberTransfer);
  const receivingUser = await userService.findOne(accountNumberReceiver);

  if (receivingUser.amount < amount) {
    return next(new AppError("insufficient Balance"));
  }
  const amountSendingUser = sendingUser.amount - amount;
  const amountReceivingUSer = receivingUser + amount;

  const updateSendingUSerPromise = userService.updateAmount(
    sendingUser,
    amountSendingUser
  );
  const updateReseivingUserPromise = userService.updateAmount(
    receivingUser,
    amountReceivingUSer
  );
  const transferPromise = transferService.create({
    amount,
    senderUserId: sendingUser.id,
    receiverUserId: receivingUser.id,
  });

  await Promise.all([
    updateSendingUSerPromise,
    updateReseivingUserPromise,
    transferPromise,
  ]);

  return res.status(201).json({
    status: "success",
    message: "Transfor done corretly",
  });
});
