import { useState } from "react";
import axios from "axios";

import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import "./App.css";

const SERVER = "http://localhost:8080";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  // const [image64String, setImage64String] = useState("");
  const [uploadState, setUploadState] = useState("uploader"); // set initial state to "uploader"
  const [imageFileName, setImageFileName] = useState("");

  const handleUpload = (image) => {
    //!Write logic for null image.
    if (!image) {
      console.log("No image selected");
    }
    console.log("Handle upload:", image);
    setUploadState("uploading");

    const formData = new FormData();
    formData.append("image", image); // Establish a file name convention

    // Check formData contents
    for (const [key, value] of formData.entries()) {
      // console.log("---");
      console.log(key, value);
    }
    //axios post to db and get response image url
    axios
      .post(`${SERVER}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Backend response: ", res.data);
        //set image url
        const imageUrl = res.data.imageUrl;
        console.log("Image url: ", imageUrl);
        setImageUrl(imageUrl);

        //retrieve image file name for get request
        setImageFileName(res.data.fileName);
        setUploadState("uploaded");
        //get image
        // axios
        //   .get(`${SERVER}/api/images/${imageFileName}`)
        //   .then((res) => {
        //     console.log("Res:", res.data);
        //     console.log(`"${res.data.image64String}'`);
        //     setImage64String(`"${res.data.image64String}'`);
        //     console.log("image64String:", image64String);
        //     setUploadState("uploaded");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setUploadState("uploader");
        //   });

        // localStorage.setItem("image", imageUrl);
      })
      .catch((err) => {
        console.error(err);
        //go back to uploader
        setUploadState("uploader");
      });
  };

  // useEffect(() => {
  //   //axios get image base 64 string from db as an effect of change of image file name
  //   console.log("Checking imageFileName inside useEffect: ", imageFileName);
  // }, [imageFileName]);

  return (
    <>
      {uploadState === "uploader" && <Uploader handleUpload={handleUpload} />}
      {uploadState === "uploading" && <Uploading />}
      {uploadState === "uploaded" && (
        <Uploaded imageFileName={imageFileName} imageUrl={imageUrl} />
      )}
    </>
  );
}

export default App;
