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
import IRatingGraph from "./irating-graph";
import IRatingGraphMobile from "./irating-graph-mobile";
import "../../styles/IRatingGraph.css";

export default function IRatingStats() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (!isDesktop) {
    return (
      <div>
        <AdSense.Google
          client="ca-pub-2805561356098125"
          slot="8831389431"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />
        <IRatingGraphMobile />
      </div>
    );
  } else {
    return (
      <div className="page-background">
        <AdSense.Google
          client="ca-pub-2805561356098125"
          slot="8831389431"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />
        <IRatingGraph />
      </div>
    );
  }
}
