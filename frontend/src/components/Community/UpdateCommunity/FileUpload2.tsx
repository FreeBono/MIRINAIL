import { useState, useRef, useEffect } from "react";
import ImagePreview from "./ImagePreview";
import "./File2.scss";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const ImageUploadBox = (props: any) => {
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState([]);
  const uploadBoxRef = useRef<any>();
  const inputRef = useRef<any>();
  const [testImages, setTestImages] = useState<any[]>([]);
  const [convertedTest, setConvertedTest] = useState<any>([]);

  useEffect(() => {
    props.setImageProcess(uploadedImages);
    // props.setImageProcess(uploadedImages.length)
  }, [uploadedImages]);

  useEffect(() => {
    props.setPostImages(testImages);
  }, [props]);

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const handleFiles = (files: any) => {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const reader = new FileReader();
        reader.onloadend = (e: any) => {
          const result: any = e.target.result;
          if (result) {
            setUploadedImages((state: any) => [...state, result].slice(0, 5));
            setTestImages((state: any) => [...state, file].slice(0, 5));
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const changeHandler = (event: any) => {
      const files = event.target.files;
      handleFiles(files);
    };

    const dropHandler = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      handleFiles(files);
    };

    const dragOverHandler = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };

    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragOverHandler);
    input.addEventListener("change", changeHandler);

    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragOverHandler);
      input.removeEventListener("change", changeHandler);
    };
  }, []);

  useEffect(() => {

    const imageJSXs: any = uploadedImages.map((image, index) => {
      const isDeleteImage = (element: any) => {
        return element === image;
      };
      const deleteFunc = () => {
        uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
        setUploadedImages([...uploadedImages]);
        setTestImages([...testImages]);
      };
      return (
        <ImagePreview
          defaultImg={props.defaultImg}
          image={image}
          deleteFunc={deleteFunc}
          test={index}
          key={index}
        />
      );
    });
    setPreviewImages(imageJSXs);
  }, [uploadedImages]);

  // 1. props??? ????????? ?????? handler ????????????
  useEffect(() => {
    const handler = async () => {
      if (props) {
        let ls: any = [];
        for await (const file of props.itemDetail.communityImg) {
          // 2. ?????? ?????? ?????? ??????
          const response = await convertURLtoFile(file.communityImgUrl);
          ls.push(response);
        }

        // 4. convertedTest ??? ????????? ?????? ??????
        setConvertedTest(ls);
      }
    };
    handler();
  }, [props.itemDetail]);

  // 5. convertedTest ???????????? ??????(????????? ?????????????????? ????????? ???????????? ?????????) fin
  useEffect(() => {

    for (const file of convertedTest) {
      if (!file.type.startsWith("image/")) continue;
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        const result: any = e.target.result;
        if (result) {
          setUploadedImages((state: any) => [...state, result].slice(0, 5));
          setTestImages((state: any) => [...state, file].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    }
  }, [convertedTest]);

  // 3. ????????? ??????
  const convertURLtoFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url ????????? ?????? ????????? ???
    const filename = url.split("/").pop(); // url ????????? ?????? ????????? ???
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  };

  return (
    <div className="ImageUploadBox2">
      <div>
        <label
          className="drag_or_click"
          htmlFor="1"
          ref={uploadBoxRef}
          style={{
            border: "5px dashed rgb(181,181,181)",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <div className="text_box">
            <h3>????????? ?????? ???????????? ?????????</h3>
            <span>????????????: oooMB ?????? ?????????</span>
          </div>
          <div className="icon_box">
            <FileUploadIcon fontSize="large" />
          </div>
        </label>
      </div>
      <input type="file" multiple accept="image/*" id="1" ref={inputRef} />
      <div className="preview_wrapper">
        <div className="preview_container">{previewImages}</div>
      </div>
    </div>
  );
};

export default ImageUploadBox;
