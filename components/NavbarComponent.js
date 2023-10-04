import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogIn from './Auth/LogIn';
import Button from 'react-bootstrap/Button';
import logo from './chatPdfLogo.png'
import Image from 'next/image';

const NavbarComponent = () => {
    const [authToggle,setAuthToggle] = useState('logIn');
    const [show,setShow] = useState(false);

    const handleLogin = ()=>{
        setShow(true);
        setAuthToggle('logIn');
    }
    const handleSignup = ()=>{
        setShow(true);
        setAuthToggle('signUp');
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
        <Image
              alt="chat pdf logo"
              src={logo}
              width={30}
              height={30}
              className="d-inline-block align-top"
            />{' '}
          ChatPDF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-block">
            <Button onClick={handleLogin} className='special-link mt-2 login_button'>LogIn</Button>
            <Button  onClick={handleSignup} className='special-link-two mt-2'>SignUp</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    <LogIn show={show} setShow={setShow} setAuthToggle={setAuthToggle} authToggle={authToggle}/>
   
    </Navbar>
  )
}

export default NavbarComponent