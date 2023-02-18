import React, { useState } from "react";
import UploaderCSS from "./Uploader.module.css";
import image from "../assets/image.svg";

const Uploader = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    console.log("Yes");
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    //Get the dropped files:
    const files = Array.from(e.dataTransfer.files);

    //Call file upload function:
    uploadFiles(files);
  };

  const uploadFiles = (files) => {
    console.log("Files getting uploaded:");
    console.log(files);
  };
  return (
    <>
      <div className={UploaderCSS.container}>
        <h1 className={UploaderCSS.title}>Upload your image</h1>
        <p className={UploaderCSS.subtitle}>File should be Jpeg, Png,...</p>
        <div
          className={`${UploaderCSS["innercontainer"]} ${
            isDragging ? UploaderCSS.dragging : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={UploaderCSS.image}>
            <img src={image} alt="abc.jpg" />
          </div>
          <p className={UploaderCSS.innercontainer__text}>
            Drag & Drop your image here
          </p>
        </div>
        <h4 className={UploaderCSS.bottomtext}>Or</h4>
        <div className={UploaderCSS.button}>
          <p className={UploaderCSS.buttontext}>Choose a file</p>
        </div>
      </div>
    </>
  );
};

export default Uploader;
