'use client'
import NavbarComponent from "@/components/NavbarComponent";
import ChatWindow from "@/components/ChatSection/ChatWindow";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import slugify from "slugify";

export default function Chat(){
    const [data,setData] = useState();
    const [indexName,setIndexName] = useState();
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        const id = localStorage.getItem('chat-pdf-id');
        if(id){
           const options = {
               method:'POST',
               headers:{'content-type':'application/json'},
               body:JSON.stringify({id:id})
           }
           setIsLoading(true);
           fetch(`${process.env.NEXT_PUBLIC_CHAT_API}/api/data`,options)
           .then((res)=>res.json())
           .then((data)=>{
            setData(data.data.dataArray)
            setIsLoading(false)
        }
            )
           .catch((e)=>console.log(e))
        }
       },[]);

       useEffect(()=>{
           if(localStorage.getItem('current_file')){
              let filename = localStorage.getItem('current_file')
              const filenameWithoutExt = filename.split(".")[0]
              const indexName = slugify(filenameWithoutExt, {
              lower: true, strict: true
            })
            setIndexName(indexName);
           }
       },[])
    return (
        <div className="container-fluid">
            <div className="bg-dark">
                <NavbarComponent/>
            </div>
            <div>
                <ChatWindow data={data} indexName={indexName} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
           {isLoading &&  <Loader/>}
        </div>
    )
}