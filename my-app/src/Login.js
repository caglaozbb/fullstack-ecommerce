import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button,Row, Col } from 'react-bootstrap';
import stringInject from "stringinject"
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate();
    const [UserName,setUserName] = useState("");
    const [UserPass,setUserPass] = useState("");


    function handleBilgiAl() {
        console.log(UserName)
        console.log(UserPass)
        var UserName2 = UserName
        var UserPass2 = UserPass
                let xmls = stringInject(
                  '<?xml version="1.0" encoding="utf-8"?>'+
                  '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
                    '<soap:Body>'+
                      '<BilgileriGetir xmlns="http://tempuri.org/">'+
                        '<UserName>{UserName2}</UserName>'+
                        '<UserPassword>{UserPass2}</UserPassword>'+
                      '</BilgileriGetir>'+
                    '</soap:Body>'+
                  '</soap:Envelope>',
            { UserName2: UserName2, UserPass2: UserPass2}
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
                var authArray = xml.getElementsByTagName("BilgileriGetirResult");
                console.log(authArray);
                var auth = authArray[0].value;
                console.log(auth);

                 if(auth==='1'){
                   console.log('Giris Basarili');
                   window.sessionStorage.setItem("auth","true");
                   userType();
                  //  navigate('/Home');
                 }
                 else if(auth ==='0')
                 {
                  window.sessionStorage.setItem("auth","false");
                  console.log("hatalı giriş")
                  alert("Hatali Giris");
                 } 
            })
            .catch((err) => {
                console.log(err);
            });
              
    };

    function userType() {
      console.log("test usertype")
      // console.log(UserName)
      // console.log(UserPass)
      var UserName2 = UserName
      var UserPass2 = UserPass
              let xmls = stringInject(
                '<?xml version="1.0" encoding="utf-8"?>'+
                  '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
                    '<soap:Body>'+
                      '<UserTypeBilgi xmlns="http://tempuri.org/">'+
                        '<UserName>{UserName2}</UserName>'+
                        '<UserPassword>{UserPass2}</UserPassword>'+
                      '</UserTypeBilgi>'+
                    '</soap:Body>'+
                 '</soap:Envelope>',
          { UserName2: UserName2, UserPass2: UserPass2}
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
              console.log("Test usertype2");
              var resStr = JSON.stringify(res.data);
              var XMLParser = require("react-xml-parser");
              var xml = new XMLParser().parseFromString(resStr);
              var UserTypeArray = xml.getElementsByTagName("UserTypeBilgiResult");
              console.log(UserTypeArray);
              var UserType = UserTypeArray[0].value;
              console.log(UserType);
              
               if(UserType==="admin"){
                 console.log('Admin Giris');
                 window.sessionStorage.setItem("UserType","true");
                 navigate('/Home');
               }
               else if(UserType ==="user")
               {
                window.sessionStorage.setItem("UserType","false");
                console.log("User Giris")
                navigate('/Home');
               } 
          })
          .catch((err) => {
              console.log(err);
          });
            
  };

  function userID() {
    console.log("test userID")
    // console.log(UserName)
    // console.log(UserPass)
    var UserName2 = UserName
    var UserPass2 = UserPass
            let xmls = stringInject(
              '<?xml version="1.0" encoding="utf-8"?>'+
               '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
                '<soap:Body>'+
                    '<userID xmlns="http://tempuri.org/">'+
                      '<UserName>{UserName2}</UserName>'+
                      '<UserPassword>{UserPass2}</UserPassword>'+
                    '</userID>'+
                  '</soap:Body>'+
                '</soap:Envelope>',
        { UserName2: UserName2, UserPass2: UserPass2}
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
            console.log("Test userID2");
            var resStr = JSON.stringify(res.data);
            var XMLParser = require("react-xml-parser");
            var xml = new XMLParser().parseFromString(resStr);
            var UserIDArray = xml.getElementsByTagName("UserIDResult");
            console.log(UserIDArray);
            var UserID = UserIDArray[0].value;
            console.log(UserID);
            window.sessionStorage.setItem("UserID",UserID);
            console.log(UserID);

            
        })
        .catch((err) => {
            console.log(err);
        });
          
};

    return (
      <Container>    
      <Row>
        <Col md={{span:3, offset:4}}>
          <Form style={formstyle}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username"  onChange={e=>setUserName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password"  onChange={e=>setUserPass(e.target.value)}></Form.Control>
            </Form.Group>
            <br></br>
            <Button variant="primary" onClick={()=>{
              handleBilgiAl()
              userID()
            }}> Login </Button>
          </Form>
        </Col>
      </Row>  
 </Container>
    );

};

const formstyle = {
  marginTop:"200px",
  width:"500px",
};

// const alertstyle = {
//   width: "700px",npm install stringinject
//   marginLeft: "330px",
// };