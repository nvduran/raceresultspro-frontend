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
  Link,
  Form,
} from "react-bootstrap";
import "../../styles/About.css";

export default function About() {
  return (
    <div>
      <Container className="about-backdrop">
        <Row>
          <Col className="ar1">
            Hi, I'm Nick and I'm a web developer in Austin, TX.
          </Col>
        </Row>
        <Row>
          <Col className="ar2">
            You can find ways to contact me on{" "}
            <a href="https://github.com/nvduran" rel="noreferrer">
              Github
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="ar3">
            This site was made using ReactJS, MongoDB, Express, and NodeJS. This
            site collects its data from the official iRacing data API
          </Col>
        </Row>
      </Container>
    </div>
  );
}
