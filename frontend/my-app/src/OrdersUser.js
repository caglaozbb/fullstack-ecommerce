import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import stringInject from "stringinject";
import axios from "axios";


export const OrdersUser = () => {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    //cikis yap fonksiyonu
    function logOut() {
        window.sessionStorage.clear();
        window.sessionStorage.setItem("auth", "false");
        window.location.reload();
    }

    
     useEffect(() => {
        var UserID = window.sessionStorage.getItem("UserID")
        var UserID2 = UserID
        let xmls = stringInject(
            '<?xml version="1.0" encoding="utf-8"?>'+
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<soap:Body>'+
                '<GetUserCars xmlns="http://tempuri.org/">'+
                  '<UserID>{UserID2}</UserID>'+
                '</GetUserCars>'+
              '</soap:Body>'+
            '</soap:Envelope>',
            {UserID2:UserID2}
        );
        axios
        .post("https://localhost:44329/WebService1.asmx?WSDL", xmls, {
          headers: {
            "Content-Type": "text/xml",
          },
        })
        .then((res) => {
          var resStr = JSON.stringify(res.data);
          var XMLParser = require("react-xml-parser");
          var xml = new XMLParser().parseFromString(resStr);
          var carIDArray = xml.getElementsByTagName("carID");
          var carModelArray = xml.getElementsByTagName("carModel");
          var carColorArray = xml.getElementsByTagName("carColor");
          var carFuelTypeArray = xml.getElementsByTagName("carFuelType");
          var customerIDArray = xml.getElementsByTagName("customerID");
          var carDateArray = xml.getElementsByTagName("carDate");
          console.log("test");
          // arabalarin bilgilerinin bulundugu listeyi alir
  
          setRows([]);
          for (let ind = 0; ind < carModelArray.length; ind++) {
            console.log(ind);
            setRows((prewRows) => [
              ...prewRows,
  
                <tr>
                  <td>{carIDArray[ind].value}</td>
                  <td>{carModelArray[ind].value}</td>
                  <td>{carColorArray[ind].value}</td>
                  <td>{carFuelTypeArray[ind].value}</td>
                  <td>{customerIDArray[ind].value}</td>
                  <td>{carDateArray[ind].value}</td>
                  <td>
                  {/* <Button variant="danger" onClick={() => deleteOrder(carIDArray[ind].value)}>Delete</Button>  */}
                  </td>
                  <td>
                  </td>
                </tr>,
              ]);
          } 
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);
  

    return(
        <Container>
        {window.sessionStorage.getItem("auth") === "true" ? (
          window.sessionStorage.getItem("UserType") === "true" ? (
            //admin ise
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
              <h3 className="centerd-flex justify-content-" >Order List</h3>
              <div className="container mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Fuel Type</th>
                    <th>Customer ID</th>
                    <th>Delivery Date</th>
                    <th>
                      {/* <Button onClick={handleShow}>Add</Button> */}
                    </th>
                    <th>
                 {/* <Button variant="secondary" onClick={handleShow2}>Update</Button>  */}
                    </th>
                  </tr>
                </thead>
                 {rows.map( (entry) => (
                    <tbody>{entry}</tbody>
                  ))} 
              </table>
            </div>
            
            {/* <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
               <Modal.Title>Add a new Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>  
                <input type="text" className="form-control" placeholder="Car model" onChange={e=>setCarModel(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Car Color" onChange={e=>setCarColor(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Car Fuel Type" onChange={e=>setCarFuelType(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Customer ID" onChange={e=>setCustomerID(e.target.value)}/> 
                <br></br>
                <input type="text" className="form-control" placeholder="Car Delivery Date" onChange={e=>setCarDate(e.target.value)}/> 
              </Modal.Body> 
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={addOrder}>Save Order</Button> 
              </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Update the Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>  
                <input type="text" className="form-control" placeholder="Car ID" onChange={e=>setCarID(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Car Model" onChange={e=>setCarModel(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Car Color" onChange={e=>setCarColor(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Car Fuel Type" onChange={e=>setCarFuelType(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Customer ID" onChange={e=>setCustomerID(e.target.value)}/>
                <br></br>
                <input type="text" className="form-control" placeholder="Car Date" onChange={e=>setCarDate(e.target.value)}/>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>Close</Button>
                <Button variant="primary" onClick={updateOrder}>Update Order</Button>
              </Modal.Footer>
            </Modal>   */}
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
            <h3 className="centerd-flex justify-content-" >Order List</h3>
            <div className="container mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Fuel Type</th>
                  <th>Customer ID</th>
                  <th>Delivery Date</th>
                  <th>
                    {/* <Button onClick={handleShow}>Add</Button> */}
                  </th>
                  <th>
               {/* <Button variant="secondary" onClick={handleShow2}>Update</Button>  */}
                  </th>
                </tr>
              </thead>
               {rows.map( (entry) => (
                  <tbody>{entry}</tbody>
                ))} 
            </table>
          </div>
          
           </Container>

            
          )
        ) : (
          navigate("/home")
        )}
      </Container>
      );
};