import { PineconeClient } from "@pinecone-database/pinecone";
import { deleteIndex } from "./deleteIndex";

let pineconeClientInstance= null;


function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

export async function createIndex( client, indexName) {
  try {
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: 1536,
        metric: "cosine",
      },
    });
    console.log(
      `Waiting for ${process.env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await delay(process.env.INDEX_INIT_TIMEOUT);
    console.log("Index created !!");
  } catch (error) {
    console.error("error ", error);
    throw new Error("Index creation failed");
  }
}

async function initPineconeClient(indexName) {
  try {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const existingIndexes = await pineconeClient.listIndexes();
    // console.log(JSON.parse(existingIndexes),'console of pinecone')
    if(existingIndexes.includes(indexName)){
      return pineconeClient;
    }
      await deleteIndex(`${existingIndexes[0]}`)
    //  console.log(checck,'checkkk')
    await delay(process.env.INDEX_INIT_TIMEOUT);
      await createIndex(pineconeClient, indexName);
  
    return pineconeClient;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient(indexName) {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient(indexName);
  }

  return pineconeClientInstance;
}