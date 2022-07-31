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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCarBurst } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <div className="landing-background-div">
      <Container className="landing-container">
        <Row className="hero-text-row">iRacing Stats, all in one place.</Row>
        <Row className="iracing-stats-row">
          <Col className="iracing-stats-left">
            <FontAwesomeIcon icon={faClipboard} size="2x" />
            iRating Stats
          </Col>
          <Col className="iracing-stats-col"></Col>
        </Row>
        <Row className="incident-stats-row">
          <Col className="incident-stats-left">
            <FontAwesomeIcon icon={faCarBurst} size="2x" />
            Incident Stats
          </Col>
          <Col className="incident-stats-col"></Col>
        </Row>
      </Container>
    </div>
  );
}
