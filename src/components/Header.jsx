import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./Header.css"

import { ShoppingCart, ScrollText } from 'lucide-react';

function Header(){
  return(
    <Navbar expand="md" className="bg-body-tertiary" sticky='top'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">E-COMMERCE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className='nav-item'>
              <ScrollText></ScrollText>
              <span>Catálogo</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className='nav-item'>
              <ShoppingCart></ShoppingCart>
              <span>Carrito</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className='nav-item'>
              <span>Login</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header