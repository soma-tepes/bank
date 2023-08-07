const express = require("express");
const globalErrorHandler = require("./controller/error.controller");
const AppError = require("./utils/appError");
const useRouter = require("./routes/user.route");
const transferRouter = require("./routes/transfer.route");
const app = express();

app.use(express.json());

app.use("/api/v1/users", useRouter);
app.use("/api/v1/users/transfer", transferRouter);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can dont find ${req.originalUrl} on this server`, 404)
  );
});
app.use(globalErrorHandler);
module.exports = app;
