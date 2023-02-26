const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      // required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    imageUrl: {
      type: String,
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("image", imageSchema);
