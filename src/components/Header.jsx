import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import "./Header.css";

import { ShoppingCart, ScrollText, ListRestart } from "lucide-react";

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          E-COMMERCE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-item">
              <ScrollText />
              <span>Catálogo</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="nav-item">
              <ShoppingCart />
              <span>Carrito</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/pedidos" className="nav-item">
              <ListRestart />
              <span>Mis pedidos</span>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <span className="nav-user">Hola, {user.email}</span>
                <Nav.Link as="button" onClick={handleLogout} className="nav-item">
                  Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-item">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
