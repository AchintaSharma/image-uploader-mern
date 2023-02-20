const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("data", dataSchema);
