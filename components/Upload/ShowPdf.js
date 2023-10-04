import React, { useEffect, useState } from "react";
import { AiFillFilePdf, AiFillDelete } from "react-icons/ai";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useRouter } from "next/navigation";

const ShowPdf = ({ fileName, setFiles,handleOpen }) => {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  console.log(fileName[0].name, "name");
  useEffect(() => {
    if (typeof fileName !== "string") {
      setFlag(true);
    }
  }, []);

  return (
    <div>
      <aside>
        <div className="my-3 text-center">
          <span className="show_pdf_format">
            {" "}
            <AiFillFilePdf className="pdf_icon" />
            {fileName} <AiFillDelete className="pdf_icon_delete" onClick={() => setFiles()} />
            <MdOutlineOpenInNew className="cursor-pointer" onClick={() => handleOpen(fileName)} />
          </span>
        </div>
      </aside>
    </div>
  );
};

export default ShowPdf;
