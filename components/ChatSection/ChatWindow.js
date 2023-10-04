import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { AiOutlineSend } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Question from "./Question";
import Answer from "./Answer";
import { useEffect } from "react";

const ChatWindow = ({ data, indexName, isLoading, setIsLoading }) => {
  const [chats, setChat] = useState([]);
  const greeting = "I am a AI powered document assistant here to help you with any questions you have about the uploaded document.";
  const [query, setQuery] = useState("");
  const [current_file,setCurrentFile] = useState('');

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
    const api = process.env.NEXT_PUBLIC_CHAT_API;
    setIsLoading(true);
    fetch(`${api}/api/search`, options)
      .then((res) => res.json())
      .then((data) => {
        const metadata = data?.message?.sourceDocuments[0]?.metadata;
        setChat((pre) => [...chats, { question: query, answer: data.message.text, pageNumber: metadata && metadata["loc.pageNumber"] }]);
        setIsLoading(false);
        setQuery('');
      })
      .catch((e) => console.log(e, "error"));
  };
  
  useEffect(()=>{
    setCurrentFile(localStorage.getItem('current_file'));
  },[])
 
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
              <input className="chat_input" type="text" placeholder="type your question"
               onChange={(e) => setQuery(e.target.value)} value={query}/>
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
