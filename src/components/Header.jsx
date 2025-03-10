import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css"

import { ShoppingCart, ScrollText } from 'lucide-react';

function Header(){
  return(
    <Navbar expand="md" className="bg-body-tertiary" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="#home">E-COMMERCE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#catalogo" className='nav-item'>
              <ScrollText></ScrollText>
              <span>Catálogo</span>
            </Nav.Link>
            <Nav.Link href="#carrito" className='nav-item'>
              <ShoppingCart></ShoppingCart>
              <span>Carrito</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header