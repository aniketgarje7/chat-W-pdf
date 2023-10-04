import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';

const LogInData = ({setAuthToggle}) => {
  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Email address *" className="mb-3 ">
            <Form.Control type="email" placeholder="name@example.com" className="input_group" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
            <span className="eye_icon">
                <AiFillEye/>
            </span>
          </FloatingLabel>
          <Button variant="primary" type="submit" className="py-2 my-2 mt-4 w-100">
            LogIn To Continue
          </Button>
         <div className="form_change_data">
            Don't have an account<span className="link-primary click_link" onClick={()=>setAuthToggle('signUp')}>  click here</span>
         </div>
    </>
  )
}

export default LogInData