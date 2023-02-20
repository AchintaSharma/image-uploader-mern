const path = require("path");
const url = require("url");
const Data = require("../models/data.model");

//Directory path for storing images
const PATH = "/uploads/images/";

//Controller for uploading image
exports.uploadImage = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      messsage: "No files were uploaded.",
    });
  }
  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let uploadedFile = req.files.image;
  console.log("file details: ", uploadedFile);
  // Use the mv() method to place the file in the desired location on the server
  const storagePath =
    path.join(__dirname, "../uploads/images/") + uploadedFile.name;
  uploadedFile.mv(storagePath, async (err) => {
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
        imageName: uploadedFile.name,
        imageUrl: `${PATH + uploadedFile.name}`,
      });

      if (!storedImage) {
        console.log("error in storing data");
        return res.status(500).send({
          success: false,
          message: `Some internal error occured while uploading file to the server`,
        });
      }
      // Send success response with file URL
      return res.status(201).send({
        success: true,
        imageId: storedImage._id,
        fileName: storedImage.imageName,
        imageUrl: storedImage.imageUrl,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: `Some internal error occured while uploading file to the server`,
      });
    }
  });
};
