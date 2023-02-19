import "./App.css";
import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadState, setUploadState] = useState("uploader"); // set initial state to "uploader"

  const handleUpload = (file) => {
    console.log(file);
    //!Write logic for null file.
    setUploadState("uploading");
    //axios post to db and get response image url
    const imageUrl =
      "https://swall.teahub.io/photos/small/212-2128299_download-wallpaper-abstrak-samsung.jpg";

    //set this to local storage for now.
    localStorage.setItem("image", imageUrl);
    //mock db response time
    setTimeout(() => {
      setUploadState("uploaded");
      setImageUrl(imageUrl);
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
