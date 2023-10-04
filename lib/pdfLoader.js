import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function pdfLoader(url){
  const file = await fetch(url)
  if(!file.ok){
    return ;
  }
  const loader = new PDFLoader(file);
  const docs = await loader.load();

   return docs;
}