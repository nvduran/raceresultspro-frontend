import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Button,
  Navbar,
  Nav,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import "../../styles/NavBar.css";

export default function NavBar() {
  return (
    <Navbar className="navbar">
      <Navbar.Brand href="">RaceResults</Navbar.Brand>
    </Navbar>
  );
}
