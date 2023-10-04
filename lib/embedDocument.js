import { OpenAIEmbeddings } from "langchain/embeddings/openai";


export async function embedDocument(doc){
     /* Create instance */
   const embeddings = new OpenAIEmbeddings();
   const documentRes = await embeddings.embedDocuments(doc);
}

