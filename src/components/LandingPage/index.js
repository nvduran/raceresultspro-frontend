import React from "react";
import AdSense from "react-adsense";
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
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const handlePick = (x) => {
    window.location.href = "/" + x;
  };
  return (
    <div className="landing-background-div">
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2805561356098125"
        crossorigin="anonymous"
      ></script>
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-2805561356098125"
        data-ad-slot="8831389431"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
      <Container className="landing-container">
        <Row className="hero-text-row">iRacing Stats, all in one place.</Row>
        <Row
          className="iracing-stats-row"
          onClick={() => handlePick("iratingstats")}
        >
          <Col className="iracing-stats-left">
            <FontAwesomeIcon icon={faClipboard} size="2x" />
            <p>iRating Stats</p>
          </Col>
          <Col className="iracing-stats-col"></Col>
        </Row>
        <Row
          className="incident-stats-row"
          onClick={() => handlePick("incidentstats")}
        >
          <Col className="incident-stats-left">
            <FontAwesomeIcon icon={faCarBurst} size="2x" />
            <p>Incident Stats</p>
          </Col>
          <Col className="incident-stats-col"></Col>
        </Row>
        <Row
          className="member-stats-row"
          onClick={() => handlePick("searchmember")}
        >
          <Col className="member-stats-left">
            <FontAwesomeIcon icon={faUsersLine} size="2x" />
            <p>Member Stats</p>
          </Col>
          <Col className="member-stats-col"></Col>
        </Row>
      </Container>
    </div>
  );
}
