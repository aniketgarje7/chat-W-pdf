import { NextResponse } from "next/server";
import { getResponseByQuery } from "@/lib/Pinecone/query";
import  {downloadUrl} from '../../../lib/Firebase/getfirebase-file'

export async function POST(req,res){
    const {query,indexName} = await req.json()
    console.log(query,'query',indexName)
    let response;
    try{
         response = await getResponseByQuery(query,indexName)
    }
    catch(e){
        console.log(e,'error')
        return NextResponse.json({message:e.message},{status:400})
    }
   
   return NextResponse.json({message:response},{status:200})
}

// export async function GET(req,res){
//    const url = await downloadUrl()
//    return NextResponse.json({message:url})
// }