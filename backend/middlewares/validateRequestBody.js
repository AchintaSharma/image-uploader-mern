const checkImage = (req, res, next) => {
  console.log("Check Image Middleware:");
  console.log("request:", req.file);
  // if (!req.file.filename || Object.keys(req.file.filename).length === 0) {
  //   return res.status(400).send({
  //     messsage: "No files were uploaded.",
  //   });
  // }
  next();
};

module.exports = {
  checkImage,
};
