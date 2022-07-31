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
import "../../styles/MemberStats.css";

let member_url = "https://irsite4-backend.herokuapp.com/memberstats/info/";
let yearly_url = "https://irsite4-backend.herokuapp.com/memberstats/yearly/";
let yearly_array_url =
  "https://irsite4-backend.herokuapp.com/memberstats/api/yearlyarray";

export default function MemberStats(custId, setCustId) {
  var currentUrl = window.location.href;
  const lastSegment = currentUrl.split("/").pop();
  console.log(lastSegment);

  return lastSegment;
}
