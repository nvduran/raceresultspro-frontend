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
import SeriesIncGraph from "./series-inc-graph";

export default function IncidentStats() {
  return (
    <div>
      <SeriesIncGraph />
    </div>
  );
}
