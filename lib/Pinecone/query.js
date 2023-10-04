import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";


export async function getResponseByQuery(query,indexName){
    const client = new PineconeClient();
    
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(indexName);
    
    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
            batchSize: 512, // Default value if omitted is 512. Max is 2048
          }),
      { pineconeIndex }
    );
    
    
    /* Use as part of a chain (currently no metadata filters) */
    const model = new OpenAI({openAIApiKey: process.env.OPENAI_KEY});
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });
    console.log(query,'querys')
    const response = await chain.call({ query: query});
    console.log(response);
    /*
    {
      text: ' A pinecone is the woody fruiting body of a pine tree.',
      sourceDocuments: [
        Document {
          pageContent: 'pinecones are the woody fruiting body and of a pine tree',
          metadata: [Object]
        }
      ]
    }
    */
   return response;
}
