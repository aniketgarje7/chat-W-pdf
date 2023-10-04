import { NextResponse } from 'next/server'
import {deleteIndex} from '../../lib/Pinecone/deleteIndex'

export async function POST(req){
   return NextResponse.json({message:'eorkd'})
}