import { useEffect, useState } from "react";
import axios from "axios";

import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import "./App.css";

const SERVER = "http://localhost:8080/upload";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadState, setUploadState] = useState("uploader"); // set initial state to "uploader"

  const handleUpload = (file) => {
    //!Write logic for null file.
    if (!file) {
      console.log("No file selected");
    }
    console.log(file);
    setUploadState("uploading");

    const formData = new FormData();
    formData.append("file", file);

    // useEffect(()=> {}, [])
    //axios post to db and get response image url
    axios
      .post(SERVER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        const imageUrl = res.data.imageUrl;
        setUploadState("uploaded");
        setImageUrl(imageUrl);
      })
      .catch((err) => {
        console.error(err);
        setUploadState("uploader");
      });
    //mock db response time

    //set this to local storage for now.
    localStorage.setItem("image", imageUrl);
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
