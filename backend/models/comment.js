const mongoose = require("mongoose");
const { RESOURCE } = require("../constants/index");
const badWords = require("bad-words");
const customBadWords = require("../helpers/customBadWords");

const filter = new badWords();
filter.addWords(...customBadWords);

const commentSchema = new mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Transaction",
    },
    ratings: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Ratings must be a whole number between 1 and 5",
      },
    },
    text: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !filter.isProfane(value);
        },
        message: "Comments cannot contain profanity.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(RESOURCE.COMMENT, commentSchema);
