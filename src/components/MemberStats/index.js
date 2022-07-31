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
  const [MemberData, setMemberData] = useState([]);
  const [AllMemberData, setAllMemberData] = useState([]);
  const [IsLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("123123123");
    startGetData();
  }, []);

  const startGetData = async () => {
    // fetch from member_url and save it to MemberData
    const response = await fetch(member_url + lastSegment);
    const data = await response.json();
    console.log(data);
    setMemberData(data[0]);
    setIsLoaded(true);
  };

  console.log(MemberData);

  if (IsLoaded) {
    return (
      <div>
        <Container>
          <Row className="memberNameRow">
            {MemberData.member[0].display_name}
          </Row>
          <Row></Row>
        </Container>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
