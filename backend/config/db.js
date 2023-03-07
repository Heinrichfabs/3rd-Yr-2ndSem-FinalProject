const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDB = asyncHandler(async () => {
  mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

module.exports = connectDB;
