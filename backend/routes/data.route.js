const dataController = require("../controllers/data.controller");

module.exports = (app) => {
  app.post("/api/upload", dataController.uploadImage);
  app.get("/api/images/:filename", dataController.getImage);
};
