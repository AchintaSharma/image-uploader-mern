import React from "react";
import UploadedCSS from "./Uploaded.module.css";
import Icon from "../components/ui/Icon";

const Uploaded = ({ imageUrl, imageString }) => {
  return (
    <div className={UploadedCSS.container}>
      <div className={UploadedCSS.container__iconholder}>
        <Icon className={UploadedCSS.icon} />
      </div>
      <div className={UploadedCSS.title}>Uploaded Successfully!</div>
      <div className={UploadedCSS.container__image}>
        <img
          className={UploadedCSS.image}
          src={imageString}
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
