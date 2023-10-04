export const deleteIndex = async (indexName) => {
  const index = String(indexName)
  const deleteUrl = `https://controller.${process.env.PINECONE_ENVIRONMENT}.pinecone.io/databases`;
  const option = {
    method:'DELETE',
    headers:{
        "Api-Key":"b2e14c51-a63c-44bf-ad40-3d6fdb93cbe1",
        "Accept":'*/*',
        "Content-Type":"application/json"
    }
  }
  const data = await fetch(`${deleteUrl}/${index}`,option)
    .then((res) =>res)
    .catch((e) => console.log(e,'e'));

  return data;
};
