import { pineconeEmbedAndStore } from "@/lib/Pinecone/vectorStore";
import { getPineconeClient } from "@/lib/Pinecone/pineconeClient";
import { pdfLoader } from "@/lib/pdfLoader";
import { createChunks } from "@/lib/createChunks";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
export async function embedVector (url,indexName)  {
  try {
    // load document
    const doc = await pdfLoader(url);
    // create chunks
    const docs = await createChunks(doc)
    // initialize pinecone client using pinecone key and Environment
    const pineconeClient = await getPineconeClient(indexName);
    console.log("Preparing chunks from PDF file");
      // 
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await pineconeEmbedAndStore(pineconeClient, docs,indexName);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
}
