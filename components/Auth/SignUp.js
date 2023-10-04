import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';

const SignUp = ({setAuthToggle}) => {
   const [showPassword,setShowPassword] = useState(false);
   const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  return (
 <>
        <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-3 ">
            <Form.Control type="text" placeholder="name@example.com" className="input_group" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInputEmail" label="Email address *" className="mb-3 ">
            <Form.Control type="email" placeholder="name@example.com" className="input_group" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control type={showPassword?'text':'password'} placeholder="Password" />
            <span className="eye_icon">
                {showPassword?<AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)}/>
                :<AiFillEye onClick={()=>setShowPassword(!showPassword)}/>}
            </span>
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
            <Form.Control type={showConfirmPassword?'text':"password"} placeholder="Confirm Password" />
            <span className="eye_icon">
                {showConfirmPassword?<AiFillEyeInvisible onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>
                :<AiFillEye onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>}
            </span>
          </FloatingLabel>
          <Button variant="primary" type="submit" className="py-2 my-2 mt-4 w-100">
            SignUp To Continue
          </Button>
         <div className="form_change_data">
            already have an account<span className="link-primary click_link" onClick={()=>setAuthToggle('logIn')}>  click here</span>
            </div>
         </>
  );
};

export default SignUp;
