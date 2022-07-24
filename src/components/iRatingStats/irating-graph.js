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
import "../../styles/IRatingGraph.css";

export default function IRatingGraph() {
  return (
    <div>
      <dl>
        <dt>Browser market share June 2015</dt>
        <dd class="percentage percentage-11">
          <span class="text">IE 11: 11.33%</span>
        </dd>
        <dd class="percentage percentage-49">
          <span class="text">Chrome: 49.77%</span>
        </dd>
        <dd class="percentage percentage-16">
          <span class="text">Firefox: 16.09%</span>
        </dd>
        <dd class="percentage percentage-5">
          <span class="text">Safari: 5.41%</span>
        </dd>
        <dd class="percentage percentage-2">
          <span class="text">Opera: 1.62%</span>
        </dd>
        <dd class="percentage percentage-2">
          <span class="text">Android 4.4: 2%</span>
        </dd>
      </dl>
    </div>
  );
}
