import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./Login";
import {UserList} from "./UserList";
import {Home} from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Container, Nav, Button } from 'react-bootstrap';


const App = () => {

  return(
    <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login/>} />
          <Route path="userlist" element={<UserList/>} />
          <Route path="home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
};


export default App;
