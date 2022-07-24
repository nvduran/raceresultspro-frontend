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
      <Navbar.Brand href="/" className="nav-name">
        <a>RaceResults</a>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/iratingstats">
          <a>iRating Stats</a>
        </Nav.Link>
        <Nav.Link href="/incidentstats">
          <a>Incident Stats</a>
        </Nav.Link>
        <Nav.Link href="/about" className="nav-item">
          <a>About</a>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
