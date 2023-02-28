import React from "react";
import UploadedCSS from "./Uploaded.module.css";
import Icon from "../components/ui/Icon";
import axios from "axios";

const SERVER = "http://localhost:8080";

const Uploaded = ({ imageUrl, imageFileName }) => {
  const getImage = (imageFileName) => {
    axios
      .get(`${SERVER}/api/images/${imageFileName}`)
      .then((res) => {
        console.log("Res:", res.data);
        // console.log(`"${res.data.image64String}'`);
        return res.data.image64String;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={UploadedCSS.container}>
      <div className={UploadedCSS.container__iconholder}>
        <Icon className={UploadedCSS.icon} />
      </div>
      <div className={UploadedCSS.title}>Uploaded Successfully!</div>
      <div className={UploadedCSS.container__image}>
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt="uploadedimage.jpg"
        />
      </div>
      <div className={UploadedCSS.container__bottom}>
        <div className={UploadedCSS.container__bottom_text} title={imageUrl}>
          {imageUrl}
        </div>
        <div
          onClick={() => navigator.clipboard.writeText(imageUrl)}
          className={UploadedCSS.container__bottom_button}
        >
          <p>Copy Link</p>
        </div>
      </div>
    </div>
  );
};

export default Uploaded;
