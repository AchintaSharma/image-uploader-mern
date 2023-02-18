import React from "react";
import UploadedCSS from "./Uploaded.module.css";
import Icon from "../components/ui/Icon";

const Uploaded = () => {
  const imageUrl =
    "https://swall.teahub.io/photos/small/212-2128299_download-wallpaper-abstrak-samsung.jpg";
  return (
    <div className={UploadedCSS.container}>
      <div className={UploadedCSS.container__iconholder}>
        <Icon className={UploadedCSS.icon} />
      </div>
      <div className={UploadedCSS.title}>Uploaded Successfully!</div>
      <div className={UploadedCSS.container__image}>
        <img src={imageUrl} alt="uploadedimage.jpg" />
      </div>
      <div className={UploadedCSS.container__bottom}>
        <div className={UploadedCSS.container__bottom_text} title={imageUrl}>
          {imageUrl}
        </div>
        <div className={UploadedCSS.container__bottom_button}>
          <p>Copy Link</p>
        </div>
      </div>
    </div>
  );
};

export default Uploaded;
