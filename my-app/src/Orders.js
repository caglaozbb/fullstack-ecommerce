import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import stringInject from "stringinject";
import axios from "axios";

export const Orders = () => {

    const navigate = useNavigate();

    //cıkısyap
    function logOut() {
        window.sessionStorage.clear();
        window.sessionStorage.setItem("auth", "false");
        window.location.reload();
    }

     ////modal siparis olustur////////
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <Container>
        {window.sessionStorage.getItem("auth") === "true" ? (
          window.sessionStorage.getItem("UserType") === "true" ? (
            <Container>
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="home">Admin Paneli</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="/home">Home</Nav.Link>
                      <Nav.Link href="#link">Orders</Nav.Link>
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
              <h3 className="centerd-flex justify-content-" >Order List</h3>
              <div className="container mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Fuel Type</th>
                    <th>Delivery Date</th>
                    <th>
                      {/* <Button onClick={handleShow}>Add</Button> */}
                    </th>
                    <th>
                {/* <Button variant="secondary" onClick={handleShow2}>Update</Button> */}
                    </th>
                  </tr>
                </thead>
                {/* {rows.map((entry) => (
                  <tbody>{entry}</tbody>
                ))} */}
              </table>
            </div>
            
             <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Order</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>  
          <input type="text" className="form-control" placeholder="Car model" onChange={e=>setCarModel(e.target.value)}/>
          <br></br>
          <input type="text" className="form-control" placeholder="Car Color" onChange={e=>setCarColor(e.target.value)}/>
          <br></br>
          <input type="text" className="form-control" placeholder="Car Fuel Type" onChange={e=>setCarFuelType(e.target.value)}/>
          <br></br>
          <input type="text" className="form-control" placeholder="Car Delivery Date" onChange={e=>setCarDate(e.target.value)}/> 
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={addOrder}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
{/* 
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update the Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <input type="text" className="form-control" placeholder="User ID" onChange={e=>setCarID(e.target.value)}/>
          <br></br>
          <input type="text" className="form-control" placeholder="User Name" onChange={e=>setCarModel(e.target.value)}/>
          <br></br>
          <input type="text" className="form-control" placeholder="User Password" onChange={e=>setCarColor(e.target.value)}/>
          <br></br>
          <input type="text" className="form-control" placeholder="User Type" onChange={e=>setCarFuelType(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={updateOrder}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  */}


            </Container>
          ) : (
            //admin değilse
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">User Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Order</Nav.Link>
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
                  <Button
                    variant="secondary"
                    onClick={this.logOut.bind(this)}
                    href="/login"
                  >
                    Log Out
                  </Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          )
        ) : (
          navigate("/home")
        )}
      </Container>
      );
};