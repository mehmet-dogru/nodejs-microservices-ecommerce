const express = require("express");
const config = require("./config/index");
const loaders = require("./loaders/index");

config();
loaders();

const app = express();

app.use(express.json());

app.use("/", (req, res, next) => {
  return res.status(200).json({
    msg: "Hello from Products Service",
  });
});

app.listen(process.env.PORT, () => {
  console.info("Products is listening to port 8002");
});
