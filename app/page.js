"use client";
import UploadPdf from "@/components/Upload/UploadPdf";
import { useState, useEffect } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import ShowPdf from "@/components/Upload/ShowPdf";
import { deleteObject } from "firebase/storage";
import { deleteFile } from "@/lib/Firebase/firebase-storage-delete";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("chat-pdf-id");
    if (id) {
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: id }),
      };
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_CHAT_API}/api/data`, options)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data.dataArray);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const deletepdf = async (pdf, key) => {

    await deleteFile(pdf.fileName);
    const id = localStorage.getItem("chat-pdf-id");
    const updateData = [...data];
    updateData.splice(key, 1);
    setData(updateData);

    const options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: id, dataArray: updateData }),
    };
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_CHAT_API}/api/data`, options)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  const handleOpen = (fileName) => {
    if (typeof fileName !== "string") {
      return;
    }
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fileName: fileName }),
    };

    setIsLoading(true);
    const api = process.env.NEXT_PUBLIC_CHAT_API;
    fetch(`${api}/api/changeIndex`, options)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("current_file", fileName);
        setIsLoading(false);
        router.push("/chat", { scroll: false });
      })
      .catch((e) =>{
        console.log(e, "error");
        setIsLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="bg-dark">
        <NavbarComponent />
      </div>
      <div>
        <UploadPdf isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className="container">
        <div className="row">
          {data.map((pdf, key) => (
            <div className="col-lg-4 col-md-6" key={key}>
              <ShowPdf fileName={pdf.fileName} setFiles={() => deletepdf(pdf, key)} handleOpen={handleOpen} />
            </div>
          ))}
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
