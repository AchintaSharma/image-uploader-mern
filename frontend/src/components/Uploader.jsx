import React, { useState, useRef } from "react";
import UploaderCSS from "./Uploader.module.css";
import image from "../assets/image.svg";

const Uploader = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    //Get the dropped file:
    const files = Array.from(e.dataTransfer.files);

    //Call handleUpload function:
    props.onUpload(files[0]);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    //Call handleUpload function:
    props.onUpload(file);
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
        <div
          onClick={() => inputRef.current.click()}
          className={UploaderCSS.button}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />
          <p className={UploaderCSS.buttontext}>Choose a file</p>
        </div>
      </div>
    </>
  );
};

export default Uploader;
