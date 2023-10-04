import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import LogInData from "./LogInData";
import SignUp from "./SignUp";

const LogIn = ({setAuthToggle,show,setShow,authToggle}) => {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>{authToggle==='logIn'?'LogIn':'SignUp'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       {authToggle==='logIn'?<LogInData setAuthToggle={setAuthToggle}/>:<SignUp setAuthToggle={setAuthToggle}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LogIn;
