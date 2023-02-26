const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");

const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");

const app = express();
app.use(cors());
app.use(fileUpload());

mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("### Error while connecting to MongoDB ####");
});
db.once("open", () => {
  console.log("#### Connected to MongoDB ####");
});

require("./routes/data.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log(`#### Server running at Port No. : ${serverConfig.PORT} ####`);
});
