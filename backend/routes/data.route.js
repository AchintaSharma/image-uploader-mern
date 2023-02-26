const dataController = require("../controllers/data.controller");
const { checkImage } = require("../middlewares/validateRequestBody");
const { upload } = require("../middlewares/imageStorage");

module.exports = (app) => {
  app.post(
    "/api/upload/",
    [upload.single("image")],
    dataController.uploadImage
  );
  app.get("/api/images/:filename", dataController.getImage);
};
