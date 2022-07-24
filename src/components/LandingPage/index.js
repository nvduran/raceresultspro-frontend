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
import "../../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <Row className="iracing-stats-row">
        <Col className="iracing-stats-col">iRacing Stats here</Col>
      </Row>
      <Row className="incident-stats-row">
        <Col className="incident-stats-col">Incident Stats here</Col>
      </Row>
    </div>
  );
}
