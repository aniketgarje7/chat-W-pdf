import { NextResponse } from "next/server";
import DataModel from "@/lib/MongoDB/SessionModel";
import { connectDB } from "@/lib/MongoDB/mongoDB";

export async function POST(req,res){
    const {id} = await req.json();
    console.log(id,'id')
    await connectDB();
    try{
        const detail = await DataModel.findOne({_id:id});

        return NextResponse.json({message:'success',data:detail},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e.message},{status:401})
    }
   
}

export async function PUT(req,res){
    const {id,dataArray} = await req.json();
    console.log(id,'id')
    await connectDB();
    try{
        const detail = await DataModel.findByIdAndUpdate(id,{dataArray:dataArray});

        return NextResponse.json({message:'success',data:detail},{status:200})
    }
    catch(e){
        return NextResponse.json({message:e.message},{status:401})
    }
}