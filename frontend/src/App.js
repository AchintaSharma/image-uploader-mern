import "./App.css";
import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadState, setUploadState] = useState("uploader"); // set initial state to "uploader"

  const handleUpload = (file) => {
    setUploadState("uploading");
    console.log(file);
    sessionStorage.setItem("image", file);
    setTimeout(() => {
      setUploadState("uploaded");
      setImageUrl(
        "https://swall.teahub.io/photos/small/212-2128299_download-wallpaper-abstrak-samsung.jpg"
      );
    }, 3000);
  };
  return (
    <>
      {uploadState === "uploader" && <Uploader onUpload={handleUpload} />}
      {uploadState === "uploading" && <Uploading />}
      {uploadState === "uploaded" && <Uploaded imageUrl={imageUrl} />}
    </>
  );
}

export default App;
