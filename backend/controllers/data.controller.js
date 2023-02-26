const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const url = require("url");
const Data = require("../models/data.model");

//Directory path for storing images
const PATH = "/uploads/images/";

//Controller for uploading image
exports.uploadImage = async (req, res) => {
  console.log("Req file name: ", JSON.stringify(req.files.image.name));
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      messsage: "No files were uploaded.",
    });
  }
  let uploadImage = req.files.image;

  console.log("image file details: ", req.files.image);
  const storagePath =
    path.join(__dirname, "../uploads/images/") + uploadImage.name;

  // Use the mv() method to place the file in the desired location on the server
  uploadImage.mv(storagePath, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: `Some internal error occured while uploading file to the server`,
      });
    }

    // Save file URL to MongoDB
    try {
      const storedImage = await Data.create({
        imageName: uploadImage.name,
        imageUrl: `${PATH + uploadImage.name}`,
      });

      console.log("stored image in db: ", storedImage);

      if (!storedImage) {
        console.log("error in storing data");
        return res.status(500).send({
          success: false,
          message: `Some internal error occured while uploading file to the server`,
        });
      }

      //create response objec
      const repsonse = {
        success: true,
        imageId: storedImage._id,
        fileName: storedImage.imageName,
        imageUrl: storedImage.imageUrl,
      };

      console.log("Res: ", repsonse.fileName);
      // Send success response with file name
      return res.status(201).send(repsonse);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: `Some internal error occured while uploading file to the server`,
      });
    }
  });
};

exports.getImage = async (req, res) => {
  console.log("entering getImage() controller");
  console.log("param: ", req.params);

  if (!req.params.filename && req.params.filename !== "") {
    console.log("no filename specified in request");
    return res.status(400).send({
      message: "No image name was specified.",
    });
  }

  try {
    console.log("Searching image in db: ", req.params.filename);
    console.log(typeof req.params.filename);
    const searchedFile = await Data.findOne({ imageName: req.params.filename });
    console.log("Found: ", searchedFile);
    if (!searchedFile) {
      console.log("file not found");
      return res.status(400).send({
        success: false,
        messsage: "File not found in server. Please try again!",
      });
    }

    const imagePath =
      path.join(__dirname, "../uploads/images/") + req.params.filename;

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          success: false,
          message: `Some internal error occured while getting image from server`,
        });
      } else {
        const base64Data = data.toString("base64");
        const mimeType = mime.lookup(imagePath);
        const image64String = `data:${mimeType};base64,${base64Data}`;
        console.log("Response length: ", Object.keys(image64String).length);
        return res.status(200).send({
          success: true,
          image64String: image64String,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      message: "Some internal server error occured.",
    });
  }
};
