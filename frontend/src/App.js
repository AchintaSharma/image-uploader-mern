import { useState, useEffect } from "react";
import axios from "axios";

import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import "./App.css";

const SERVER = "http://localhost:8080";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [image64String, setImage64String] = useState("");
  const [uploadState, setUploadState] = useState("uploader"); // set initial state to "uploader"

  const handleUpload = (image) => {
    //!Write logic for null image.
    if (!image) {
      console.log("No image selected");
    }
    console.log(image);
    setUploadState("uploading");

    const formData = new FormData();
    formData.append("image", image); // Establish a file name convention

    //axios post to db and get response image url
    axios
      .post(`${SERVER}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        const imageUrl = res.data.imageUrl;
        setImageUrl(imageUrl);
        setImageFileName(res.data.fileName);
        localStorage.setItem("image", imageUrl);
      })
      .catch((err) => {
        console.error(err);
        setUploadState("uploader");
      });
  };

  useEffect(() => {
    //axios get image base 64 string from db as an effect of change of image file name
    axios
      .get(`${SERVER}/api/images/${imageFileName}`)
      .then((res) => {
        console.log("Res:", res);
        console.log(res.data.imageDataUrl);
        setImage64String(res.data.imagDataUrl);
        setUploadState("uploaded");
        // console.log("image64String:", image64String);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageFileName]);

  return (
    <>
      {console.log("imageString: ", image64String)}
      {uploadState === "uploader" && <Uploader onUpload={handleUpload} />}
      {uploadState === "uploading" && <Uploading />}
      {uploadState === "uploaded" && (
        <Uploaded imageUrl={imageUrl} image={image64String} />
      )}
    </>
  );
}

export default App;
