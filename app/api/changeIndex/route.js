import { NextResponse } from "next/server";
import { embedVector } from "@/script/prepare";
import { downloadUrl } from "@/lib/Firebase/getfirebase-file";
import slugify from "slugify";

export async function POST(req,res){
   const {fileName} = await req.json();

   if(!fileName){
    return NextResponse.json({message:'provide valid filename'},{status:400})
   }
   const url =await downloadUrl(fileName);

   if(url==='' || !url){
    return NextResponse.json({message:'error downloading url'})
   }
   const filenameWithoutExt = fileName.split(".")[0]
   const indexName = slugify(filenameWithoutExt, {
     lower: true, strict: true
   })
   
    try{
        await embedVector(url,indexName)

      return NextResponse.json({message:'details saved'},{status:200});
     }
     catch(e){
       console.log(e,'error')
       return NextResponse.json({message:e.message},{status:401})
     }
     
   
}