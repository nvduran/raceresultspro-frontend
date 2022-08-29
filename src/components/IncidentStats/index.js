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
import SeriesIncGraph from "./series-inc-graph";

export default function IncidentStats() {
  return (
    <div>
      <AdSense.Google
        client="ca-pub-2805561356098125"
        slot="8831389431"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />
      <SeriesIncGraph />
    </div>
  );
}
