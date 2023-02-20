const dataController = require("../controllers/data.controller");

module.exports = (app) => {
  app.post("/upload", dataController.uploadImage);
};
