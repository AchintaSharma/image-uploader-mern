const path = require("path");
const Image = require("../models/data.model");
const fs = require("fs");

//Directory path for storing images
const PATH = "/upload/images/";

//Controller for uploading image
exports.uploadImage = async (req, res) => {
  // handle case where image is not provided by the user
  if (!req.file || req.file.filename == "") {
    console.log("No image provided");
    return res.status(400).send({
      success: false,
      messsage: "No image is provided.",
    });
  }

  //check request file name
  console.log("request:", req.file.filename);

  //store file in db
  try {
    const saveImage = await Image.create({
      imageName: req.file.filename,
      image: {
        data: fs.readFileSync("upload/images/" + req.file.filename),
        contentType: `image/${path.extname(req.file.filename).slice(1)}`,
      },
      imageUrl: `${PATH}${req.file.filename}`,
    });

    // console.log("Stored image in db:", saveImage);

    //Handle save operation on db failure
    if (!saveImage) {
      console.log("error in storing image");
      return res.status(500).send({
        success: false,
        message: `Some internal error occured while uploading image to the server`,
      });
    }

    //create response object
    const repsonse = {
      success: true,
      imageId: saveImage._id,
      fileName: saveImage.imageName,
      // image: saveImage.image,
      imageUrl: saveImage.imageUrl,
    };
    console.log("response: ", repsonse);

    // Send success response with response object
    return res.status(201).send(repsonse);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: `Some internal error occured while uploading image to the server`,
    });
  }
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
          image64String,
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
