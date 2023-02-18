import React from "react";
import UploadingCSS from "./Uploading.module.css";

const Uploading = () => {
  return (
    <div className={UploadingCSS.container}>
      <div className={UploadingCSS.title}>Uploading...</div>
      <div className={UploadingCSS.loadingbar}>
        <div className={UploadingCSS.loadingsegment}></div>
      </div>
    </div>
  );
};

export default Uploading;
