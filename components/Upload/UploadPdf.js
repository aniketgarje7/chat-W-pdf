import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "react-bootstrap/Button";
import ShowPdf from "./ShowPdf";
import { uploadFile } from "../../lib/Firebase/firebase-storage-upload";
import { useRouter } from "next/navigation";

const UploadPdf = ({ isLoading, setIsLoading }) => {
  const [files, setFiles] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#adb5bd",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#6c757d",
    outline: "none",
    transition: "border .24s ease-in-out",
    height: "100%",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (!acceptedFiles.length > 0) {
      return;
    }
    console.log(acceptedFiles, "accepted files");
    setFile(acceptedFiles[0]);

    setFiles(acceptedFiles.map((f) => <span key={f.name}>{f.name}</span>));
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleUpload = async () => {
    try {
      uploadFile(file, setProgress);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (progress !== 100 || !file) {
      return;
    }
    const id = localStorage.getItem("chat-pdf-id");
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fileName: file.name, id: id ? id : null }),
    };
    setIsLoading(true);
    const api = process.env.NEXT_PUBLIC_CHAT_API;
    fetch(`${api}/api/createdb`, options)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("chat-pdf-id", data.id);
        console.log(data.id);
        setIsLoading(false);
        localStorage.setItem('current_file',file.name)
        router.push("/chat", { scroll: false });
      })
      .catch((e) => console.log(e, "error"));
  }, [progress]);

  const handleOpen = () => {};
  return (
    <div className="upload_div container my-4 ">
      <div {...getRootProps({ style })} className="drag_n_drop_box">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      <div>{files && <ShowPdf fileName={files} setFiles={setFiles} handleOpen={handleOpen} />}</div>
      <div className="text-center my-3">
        <Button onClick={handleUpload} className="p-2 px-3" disabled={isLoading}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadPdf;
