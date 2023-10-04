import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { AiOutlineSend } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Question from "./Question";
import Answer from "./Answer";
import Image from "next/image";
import logo from "../chatPdfLogo.png";
import { useEffect } from "react";

const ChatWindow = ({ data, indexName, isLoading, setIsLoading }) => {
  const [chats, setChat] = useState([]);
  const greeting = "I am a multilingual document assistant here to help you with any questions you have about the uploaded document.";
  const [query, setQuery] = useState("");
  const [metadata, setMetaData] = useState();

  const handleQuery = () => {
    if (!data.length > 0 && indexName) {
      return;
    }
    if (query === "") {
      return;
    }
    setChat([...chats, { question: query }]);
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: query, indexName: indexName ? indexName : data[data.length - 1].vectorIndex }),
    };
    const api = "http://localhost:3000/api";
    setIsLoading(true);
    fetch(`${api}/search`, options)
      .then((res) => res.json())
      .then((data) => {
        // setMetaData(data.message.sourceDocuments[0].metadata);
        const metadata = data?.message?.sourceDocuments[0]?.metadata;
        setChat((pre) => [...chats, { question: query, answer: data.message.text, pageNumber: metadata && metadata["loc.pageNumber"] }]);
        console.log(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e, "error"));
    console.log(indexName, "in frontend");
  };
  
  const [current_file,setCurrentFile] = useState('')
  useEffect(()=>{
    setCurrentFile(localStorage.getItem('current_file'))
    console.log(localStorage.getItem('current_file'),'dfsfs')
  },[])
 console.log(current_file,'currentf')
  return (
    <Container>
      <Card className="chat_card_section my-5">
        <Card.Header className="border-0 chat_card_header">Chat PDF <span className="current_file">{current_file}</span></Card.Header>

        <Card.Body className="chat_card_body">
          <div>
            <Answer answer={greeting} />
          </div>
          <div>
            {chats.map((chat, key) => (
              <section key={key} className="py-1">
                <div>
                  <Question question={chat.question} />
                </div>
                {chat.answer && (
                  <div>
                    <Answer answer={chat.answer} pageNumber={chat.pageNumber} />
                    {/* {<span className='mx-md-4'>referance page number :{metadata['loc.pageNumber']}</span>} */}
                  </div>
                )}
              </section>
            ))}
          </div>
        </Card.Body>

        <Card.Footer className="text-muted border-0 chat_card_footer">
          <div className="d-flex justify-content-center">
            {/* <div className='chat_input_logo d-none d-sm-block'> 
        <Image src={logo} width={30} height={30} alt='website_logo' className='chat_input_image'/>
        </div> */}
            <div className="chat_input_div">
              <input className="chat_input" type="text" placeholder="type your question" onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="chat_send_button" onClick={handleQuery}>
              <AiOutlineSend className="chat_send_button_icon" />
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatWindow;
