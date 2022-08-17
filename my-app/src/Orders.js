import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import stringInject from "stringinject";
import axios from "axios";

export const Orders = () => {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);

    //cıkısyap
    function logOut() {
        window.sessionStorage.clear();
        window.sessionStorage.setItem("auth", "false");
        window.location.reload();
    }

    //Order ekle//
    const [CarID,setCarID] = useState();
    const [CarModel,setCarModel] = useState("");
    const [CarColor,setCarColor] = useState("");
    const [CarFuelType,setCarFuelType] = useState("");
    const [CustomerID,setCustomerID] = useState();
    const [CarDate,setCarDate] = useState();


    ////modal siparis ekle////////
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ////modal siparis düzenle////////
    // const [show2, setShow2] = useState(false);
    // const handleClose2 = () => setShow2(false);
    // const handleShow2 = () => setShow2(true);

    useEffect(() => {
      let xmls = stringInject(
        '<?xml version="1.0" encoding="utf-8"?>'+
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
            '<soap:Body>'+
              '<Getcars xmlns="http://tempuri.org/" />'+
            '</soap:Body>'+
          '</soap:Envelope>',
        {}
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
console.log(carModelArray.length);
        console.log(carIDArray[0].value);
        console.log(carModelArray[0].value);
        console.log(carColorArray[0].value);
        console.log(carFuelTypeArray[0].value);
        console.log(customerIDArray[0].value);
        console.log(carDateArray[0].value);

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
                <Button variant="danger">Delete</Button> 
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

    //orderekle fonksiyonu
    function addOrder(){
      var CarModel2 = CarModel
      var CarColor2 = CarColor
      var CarFuelType2 = CarFuelType
      var CustomerID2 = CustomerID
      var CarDate2 = CarDate
      let xmls = stringInject(
        '<?xml version="1.0" encoding="utf-8"?>'+
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
            '<soap:Body>'+
              '<AddCar xmlns="http://tempuri.org/">'+
                '<CarModel>{CarModel2}</CarModel>'+
                '<CarColor>{CarColor2}</CarColor>'+
                '<CarFuelType>{CarFuelType2}</CarFuelType>'+
                '<CustomerID>{CustomerID2}</CustomerID>'+
                '<CarDate>{CarDate2}</CarDate>'+
              '</AddCar>'+
            '</soap:Body>'+
          '</soap:Envelope>',
      {CarModel2: CarModel2, CarColor2: CarColor2, CarFuelType2: CarFuelType2, CustomerID2: CustomerID2, CarDate2: CarDate2}
      );
      console.log(xmls)
      axios
      .post("https://localhost:44329/WebService1.asmx?WSDL", xmls,{
        headers:{
          "Content-Type": "text/xml",
        },
      })
      .then((res) => {
        console.log(res);
        // console.log("Test");
        var resStr = JSON.stringify(res.data);
        var XMLParser = require("react-xml-parser");
        var xml = new XMLParser().parseFromString(resStr);
        var authArray = xml.getElementsByTagName("AddCarResult");
        console.log(authArray);
        var auth = authArray[0].value;
        console.log(auth);
      })
      .catch((err) => {
        console.log(err);
      });
    };


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
                      <Button onClick={handleShow}>Add</Button>
                    </th>
                    <th>
                 <Button variant="secondary">Update</Button> 
                    </th>
                  </tr>
                </thead>
                 {rows.map( (entry) => (
                    <tbody>{entry}</tbody>
                  ))} 
              </table>
            </div>
            
             <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addOrder}>
            Save Changes
          </Button> 
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