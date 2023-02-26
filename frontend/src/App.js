import { useState } from "react";
import axios from "axios";

import Uploader from "./components/Uploader";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";
import "./App.css";

const SERVER = "http://localhost:8080";

function App() {
  const [imageUrl, setImageUrl] = useState("");
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
        const imageUrl = res.data.imageUrl;

        const imageFileName = res.data.fileName;
        console.log("Image url: ", imageUrl);
        // setImageUrl(imageUrl);
        console.log("ImageFileName: ", imageFileName);

        //get image
        axios
          .get(`${SERVER}/api/images/${imageFileName}`)
          .then((res) => {
            console.log("Res:", res.data);
            console.log(`"${res.data.image64String}'`);
            setImage64String(`"${res.data.image64String}'`);
            setUploadState("uploaded");
            console.log("image64String:", image64String);
          })
          .catch((err) => {
            console.log(err);
            setUploadState("uploader");
          });

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
      {console.log("imageString: ", image64String)}
      {uploadState === "uploader" && <Uploader onUpload={handleUpload} />}
      {uploadState === "uploading" && <Uploading />}
      {uploadState === "uploaded" && (
        <Uploaded imageUrl={imageUrl} image64String={image64String} />
      )}
    </>
  );
}

export default App;
