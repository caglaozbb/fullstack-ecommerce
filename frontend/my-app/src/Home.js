import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import stringInject from "stringinject";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();

  //cıkısyap
  function logOut() {
    window.sessionStorage.clear();
    window.sessionStorage.setItem("auth", "false");
    window.location.reload();
  };

  return (
    <Container>
      {window.sessionStorage.getItem("auth") === "true" ? (
        window.sessionStorage.getItem("UserType") === "true" ? (
          
          //adminse
          <Container>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="home">Admin Paneli</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                    <NavDropdown title="Actions" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/UserList" >
                        UserList
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                  <Button variant="secondary" onClick={logOut} href="/login">
                    Log Out
                  </Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div>
              <h1 className="d-flex justify-content-center" > ADMIN OLARAK GIRIS YAPTINIZ</h1>
            </div>
          </Container>
        ) : (
          //admin değilse
         <Container>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/home">User Panel</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/ordersuser">Orders</Nav.Link>
                  <NavDropdown title="Actions" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                  <Button variant="secondary" onClick={logOut} href="/login">
                    Log Out
                  </Button>
                </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
             <h1 className="d-flex justify-content-center" > KULLANICI OLARAK GIRIS YAPTINIZ</h1>
          </div>
        </Container>
        )
      ) : (
        navigate("/Login")
      )}
    </Container>
  );
};
