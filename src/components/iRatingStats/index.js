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
import IRatingGraph from "./irating-graph";

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
    return <div>MOBILE GRAPH</div>;
  } else {
    return (
      <div>
        <IRatingGraph />
      </div>
    );
  }
}
