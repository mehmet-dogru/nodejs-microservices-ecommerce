const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("Products MongoDB Connection SUCCESS!");
    })
    .catch(() => {
      console.log("MongoDB Connection FAILED!");
    });
};

module.exports = {
  connectDB,
};
