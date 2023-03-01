import { useState } from "react";
import axios from "axios";

import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import "./App.css";

const SERVER = "http://localhost:8080";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageString, setImageString] = useState("");
  const [uploadState, setUploadState] = useState("uploader"); // set initial state to "uploader"

  const handleUpload = (image) => {
    //if no image is provided
    if (!image) {
      console.log("No image selected.");
      return;
    }
    // console.log("Image to upload:", image);
    setUploadState("uploading");

    const formData = new FormData();
    formData.append("image", image); // Establish a file name convention

    //  Check formData contents
    /*    console.log("Form");
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
     */

    //axios post to db and get response image url
    axios
      .post(`${SERVER}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log("Backend response: ", res.data);
        setImageUrl(SERVER + res.data.imageUrl.replace("upload", "api"));

        axios
          .get(`${SERVER}/api/images/${res.data.fileName}`)
          .then((res) => {
            setImageString(res.data.image64String);
            return;
          })
          .catch((err) => {
            console.log(err);
          });

        setUploadState("uploaded");
      })
      .catch((err) => {
        console.error(err);
        //if err, go back to uploader
        console.log(err);
        setUploadState("uploader");
      });
  };

  return (
    <>
      {uploadState === "uploader" && <Uploader handleUpload={handleUpload} />}
      {uploadState === "uploading" && <Uploading />}
      {uploadState === "uploaded" && (
        <Uploaded imageString={imageString} imageUrl={imageUrl} />
      )}
    </>
  );
}

export default App;
