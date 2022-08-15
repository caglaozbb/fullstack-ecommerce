import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import stringInject from "stringinject";
import axios from "axios";

export const UserList = () => {
    console.log("userlist")
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

  //cıkısyap
  function logOut() {
    window.sessionStorage.clear();
    window.sessionStorage.setItem("auth", "false");
    window.location.reload();
  }
    ////userekle-sil////////
  const [UserName,setUserName] = useState("");
  const [UserPass,setUserPass] = useState("");
  const [UserType,setUserType] = useState("");

  ////modal////////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///userlistesial///
  useEffect(() => {
    let xmls = stringInject(
      '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        "<soap:Body>" +
        '<GetUsers xmlns="http://tempuri.org/" />' +
        "</soap:Body>" +
        "</soap:Envelope>",
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
        var usernameArray = xml.getElementsByTagName("userName");
        var userpasswordArray = xml.getElementsByTagName("password");
        var usertypeArray = xml.getElementsByTagName("userType");
        console.log(usernameArray[0].value);
        console.log(userpasswordArray[0].value);
        setRows([]);
        for (let ind = 0; ind < usernameArray.length; ind++) {
          console.log(ind);
          setRows((prewRows) => [
            ...prewRows,

            <tr>
              <td>{usernameArray[ind].value}</td>
              <td>{userpasswordArray[ind].value}</td>
              <td>{usertypeArray[ind].value}</td>
              <td>
                <Button variant="danger" onClick={deleteUser}>Sil</Button>
              </td>
            </tr>,
          ]);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

//userekle fonksiyonu
  function addUser(){
    var UserName2 = UserName
    var UserPass2 = UserPass
    var UserType2 = UserType
    let xmls = stringInject(
      '<?xml version="1.0" encoding="utf-8"?>'+
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
        '<soap:Body>'+
          '<AddUser xmlns="http://tempuri.org/">'+
            '<UserName>{UserName2}</UserName>'+
            '<UserPassword>{UserPass2}</UserPassword>'+
            '<UserType>{UserType2}</UserType>'+
          '</AddUser>'+
        '</soap:Body>'+
      '</soap:Envelope>',
  {UserName2: UserName2, UserPass2: UserPass2, UserType2:UserType2}
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
    var authArray = xml.getElementsByTagName("AddUserResult");
    console.log(authArray);
    var auth = authArray[0].value;
    console.log(auth);
    
  })
  .catch((err) => {
    console.log(err);
  });

  };

    function deleteUser (UserName2, UserPass2, UserType2){
        console.log("deleteuser");

        let xmls = stringInject(
          '<?xml version="1.0" encoding="utf-8"?>'+
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<soap:Body>'+
                '<DeleteUsers xmlns="http://tempuri.org/">'+
                  '<UserName>{UserName2}</UserName>'+
                  '<UserPassword>{UserPass2}</UserPassword>'+
                  '<UserType>{UserType2}</UserType>'+
                '</DeleteUsers>'+
              '</soap:Body>'+
            '</soap:Envelope>',
      {UserName2: UserName2, UserPass2: UserPass2, UserType2:UserType2}
      );
      console.log(xmls)
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
      var authArray = xml.getElementsByTagName("DeleteUsersResult");
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
            // {console.log(window.sessionStorage.getItem('auth'))}
  
            //adminse
  
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
              <h3 className="centerd-flex justify-content-" >Kullanıcı Listesi</h3>
              <div className="container mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>userType</th>
                    <th>
                      <Button onClick={handleShow}>Ekle</Button>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                {rows.map((entry) => (
                  <tbody>{entry}</tbody>
                ))}
              </table>
            </div>
            
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <input type="text" class="form-control" placeholder="User Name" onChange={e=>setUserName(e.target.value)}/>
          <br></br>
          <input type="text" class="form-control" placeholder="User Password" onChange={e=>setUserPass(e.target.value)}/>
          <br></br>
          <input type="text" class="form-control" placeholder="User Type" onChange={e=>setUserType(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
    )
};

