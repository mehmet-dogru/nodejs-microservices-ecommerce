const express = require("express");
const config = require("./config/index");
const loaders = require("./loaders/index");
const errorHandler = require("./middlewares/error-handler.middleware");
const { customerRoutes, addressRoutes } = require("./api-routes");

config();
loaders();

const app = express();
app.use(express.json());

app.use("/", customerRoutes);
app.use("/address", addressRoutes);

app.use((req, res, next) => {
  next(new ApiError("Endpoint not found. Please enter valid enpoint", httpStatus.BAD_REQUEST));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.info("Customer is listening to port 8001");
});
