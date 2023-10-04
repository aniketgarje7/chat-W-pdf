import { NextResponse } from "next/server";
import { embedVector } from "@/script/prepare";
import { downloadUrl } from "@/lib/Firebase/getfirebase-file";
import { connectDB } from "@/lib/MongoDB/mongoDB";
import DataModel from "@/lib/MongoDB/SessionModel";
import slugify from "slugify";

export async function POST(req,res){
   const {fileName,id} = await req.json();

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

        await connectDB();
        const fileData = {
          fileName: fileName,
          fileUrl: url,
          vectorIndex: indexName,
        }
        if(id){
          let {dataArray} = await DataModel.findOne({_id:id});
          if(dataArray){
              await DataModel.findByIdAndUpdate(id,{dataArray:[...dataArray,fileData]})
            }
        }
        else{
          const dataModelCreated = await DataModel.create({dataArray:[fileData]})
          return NextResponse.json({message:'details saved',id:dataModelCreated.id},{status:200});
        }
        
      return NextResponse.json({message:'details saved',id:id},{status:200});
     }
     catch(e){
       console.log(e,'error')
       return NextResponse.json({message:e.message},{status:401})
     }
     
   
}