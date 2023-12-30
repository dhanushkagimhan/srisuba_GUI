import Resizer from "react-image-file-resizer";

const resizeImageFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });

export default resizeImageFile;
