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
  const [CareerData, setCareerData] = useState([]);
  const [IsLoaded, setIsLoaded] = useState(false);
  const [CategoryData, setCategoryData] = useState("iRating_data");
  const [AvgRoadStarts, setAvgRoadStarts] = useState(0);

  useEffect(() => {
    startGetData();
  }, []);

  const startGetData = async () => {
    // fetch from member_url and save it to MemberData
    const response = await fetch(member_url + lastSegment);
    const data = await response.json();
    setMemberData(data[0]);
    if (data[0] === undefined) {
      setTimeout(() => {
        startGetData();
      }, 1000);
    } else {
      getCareerStats();
    }
  };

  const getCareerStats = async () => {
    // fetch from yearly_url and save it to CareerData
    const response = await fetch(yearly_url + lastSegment);
    const data = await response.json();
    // sort data[0].stats by category_id
    data[0].stats.sort((a, b) => {
      return a.category_id - b.category_id;
    });

    setCareerData(data[0]);
    getAllMemberData();
  };

  const getAllMemberData = async () => {
    // fetch from yearly_array_url and save it to AllMemberData
    const response = await fetch(yearly_array_url);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      // sort data[i].stats by category_id
      data[i].stats.sort((a, b) => {
        return a.category_id - b.category_id;
      });
    }
    setAllMemberData(data);
    calculateAverages(data);
  };

  const calculateAverages = (data) => {
    //map through data and calculate averages for data.stats[1].starts
    let bigArrOfRoadStarts = [];
    let avgRoadStarts;
    for (let i = 0; i < data.length; i++) {
      bigArrOfRoadStarts.push(data[i].stats[1].starts);
    }

    avgRoadStarts =
      bigArrOfRoadStarts.reduce((a, b) => a + b, 0) / bigArrOfRoadStarts.length;

    setAvgRoadStarts(avgRoadStarts);
    setIsLoaded(true);
  };

  //   console.log(MemberData);
  //   console.log(CareerData);

  if (IsLoaded) {
    return (
      <div>
        <Container>
          <Row className="memberNameRow">
            {MemberData.member[0].display_name}
          </Row>
          <Row className="categoryNameRow">Road</Row>
          <Row className="statsNameRow">
            <Col>iRating</Col>
            <Col>Starts</Col>
            <Col>Avg. Incidents</Col>
          </Row>
          <Row className="statsValueRow">
            <Col className="valueColItem">
              {
                MemberData.iRating_data[MemberData.iRating_data.length - 1]
                  .value
              }
            </Col>
            <Col className="valueColItem">
              <Row>{MemberData.member[0].display_name}</Row>
              <Row>{CareerData.stats[1].starts}</Row>

              <Row>User Avg.</Row>
              <Row>{AvgRoadStarts.toFixed(0)}</Row>
            </Col>
            <Col>{CareerData.stats[1].avg_incidents.toFixed(2)}</Col>
          </Row>
          <Row className="avgsNameRow">
            <Col>iRating / Starts</Col>
            <Col>iRating / Avg. Incidents</Col>
          </Row>
          <Row className="avgsValueRow">
            <Col className="valueColItem">
              {(
                MemberData.iRating_data[MemberData.iRating_data.length - 1]
                  .value / CareerData.stats[1].starts
              ).toFixed(2)}
            </Col>
            <Col>
              {(
                MemberData.iRating_data[MemberData.iRating_data.length - 1]
                  .value / CareerData.stats[1].avg_incidents
              ).toFixed(2)}
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
