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
let ir_arr_url =
  "https://irsite4-backend.herokuapp.com/memberstats/api/roadirating";
let oval_ir_arr_url =
  "https://irsite4-backend.herokuapp.com/memberstats/api/ovalirating";

export default function MemberStats(custId, setCustId) {
  var currentUrl = window.location.href;
  const lastSegment = currentUrl.split("/").pop();
  const [MemberData, setMemberData] = useState([]);
  const [AllMemberData, setAllMemberData] = useState([]);
  const [CareerData, setCareerData] = useState([]);
  const [IsLoaded, setIsLoaded] = useState(false);
  const [IsLoaded2, setIsLoaded2] = useState(false);
  const [CategoryData, setCategoryData] = useState("iRating_data");
  const [AvgRoadStarts, setAvgRoadStarts] = useState(0);
  const [AvgOvalStarts, setAvgOvalStarts] = useState(0);
  const [BigStartsArray, setBigStartsArray] = useState([]);
  const [BigOvalStartsArray, setBigOvalStartsArray] = useState([]);
  const [AvgRoadIncidents, setAvgRoadIncidents] = useState(0);
  const [AvgOvalIncidents, setAvgOvalIncidents] = useState(0);
  const [BigIncidentsArray, setBigIncidentsArray] = useState([]);
  const [BigOvalIncidentsArray, setBigOvalIncidentsArray] = useState([]);
  const [AlliRatings, setAlliRatings] = useState([]);
  const [AllOvaliRatings, setAllOvaliRatings] = useState([]);
  const [RatingAvg, setRatingAvg] = useState(0);
  const [OvalRatingAvg, setOvalRatingAvg] = useState(0);

  useEffect(() => {
    startGetData();
  }, []);

  const startGetData = async () => {
    // fetch from member_url and save it to MemberData
    const response = await fetch(member_url + lastSegment);
    const data = await response.json();
    console.log(data[0]);
    if (data[0] === undefined) {
      console.log("No data found");
      startGetData();
    } else {
      setMemberData(data[0]);
      getCareerStats();
      getAllRatings();
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
    getAllOvalRatings();
  };

  const getAllRatings = async () => {
    // fetch from ir_arr_url and save it to AlliRatings
    const response = await fetch(ir_arr_url);
    const data = await response.json();
    console.log(data.length);
    setAlliRatings(data);
    calculateIratingAverages(data);
  };

  const getAllOvalRatings = async () => {
    // fetch from oval_ir_arr_url and save it to AllOvaliRatings
    const response = await fetch(oval_ir_arr_url);
    const data = await response.json();
    setAllOvaliRatings(data);
    calculateOvaliRatingAverages(data);
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
    console.log(data);
    //map through data and calculate averages for data.stats[1].starts
    let bigArrOfRoadStarts = [];
    let bigArrOfRoadIncidents = [];
    let bigArrOfOvalStarts = [];
    let bigArrOfOvalIncidents = [];
    let avgRoadStarts;
    let avgRoadIncidents;
    let avgOvalStarts;
    let avgOvalIncidents;
    for (let i = 0; i < data.length; i++) {
      bigArrOfRoadStarts.push(data[i].stats[1].starts);
    }

    for (let i = 0; i < data.length; i++) {
      bigArrOfRoadIncidents.push(data[i].stats[1].avg_incidents);
    }

    for (let i = 0; i < data.length; i++) {
      bigArrOfOvalStarts.push(data[i].stats[0].starts);
    }

    for (let i = 0; i < data.length; i++) {
      bigArrOfOvalIncidents.push(data[i].stats[0].avg_incidents);
    }

    avgRoadStarts =
      bigArrOfRoadStarts.reduce((a, b) => a + b, 0) / bigArrOfRoadStarts.length;

    avgRoadIncidents =
      bigArrOfRoadIncidents.reduce((a, b) => a + b, 0) /
      bigArrOfRoadIncidents.length;

    avgOvalStarts =
      bigArrOfOvalStarts.reduce((a, b) => a + b, 0) / bigArrOfOvalStarts.length;

    avgOvalIncidents =
      bigArrOfOvalIncidents.reduce((a, b) => a + b, 0) /
      bigArrOfOvalIncidents.length;

    setBigStartsArray(bigArrOfRoadStarts);
    setBigOvalStartsArray(bigArrOfOvalStarts);
    setAvgRoadStarts(avgRoadStarts);
    setAvgOvalStarts(avgOvalStarts);
    setBigIncidentsArray(bigArrOfRoadIncidents);
    setBigOvalIncidentsArray(bigArrOfOvalIncidents);
    setAvgRoadIncidents(avgRoadIncidents);
    setAvgOvalIncidents(avgOvalIncidents);
  };

  const calculateIratingAverages = (data) => {
    // get avg of AlliRatings and return
    console.log(data);
    let avg = 0;
    for (let i = 0; i < data.length; i++) {
      avg += data[i];
    }
    avg = avg / data.length;
    console.log(avg);
    setRatingAvg(avg.toFixed(0));
  };

  const calculateOvaliRatingAverages = (data) => {
    // get avg of AllOvaliRatings and return
    console.log(data);
    let avg = 0;
    for (let i = 0; i < data.length; i++) {
      avg += data[i];
    }
    avg = avg / data.length;
    console.log(avg);
    setOvalRatingAvg(avg.toFixed(0));
    setIsLoaded(true);
  };

  const calculateStartsPercentile = (starts) => {
    //calculate percentile of starts from BigStartsArray

    //sort BigStartsArray
    let sortedData = BigStartsArray.sort((a, b) => {
      return a - b;
    });
    let percentile = 0;
    let index = 0;
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] > starts) {
        index = i;
        break;
      }
    }
    percentile = (index / sortedData.length) * 100;
    return percentile.toFixed(2);
  };

  const calculateOvalStartsPercentile = (starts) => {
    //calculate percentile of starts from BigOvalStartsArray

    //sort BigOvalStartsArray
    let sortedData = BigOvalStartsArray.sort((a, b) => {
      return a - b;
    });
    let percentile = 0;
    let index = 0;
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] > starts) {
        index = i;
        break;
      }
    }
    percentile = (index / sortedData.length) * 100;
    return percentile.toFixed(2);
  };

  const calculateIncidentsPercentile = (incidents) => {
    //calculate percentile of incidents from BigIncidentsArray
    console.log(incidents);
    //sort BigIncidentsArray
    let sortedData = BigIncidentsArray.sort((a, b) => {
      return a - b;
    });
    let percentile = 0;
    let index = 0;
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] > incidents) {
        index = i;
        break;
      }
    }
    percentile = (index / sortedData.length) * 100;
    return percentile.toFixed(2);
  };

  const calculateOvalIncidentsPercentile = (incidents) => {
    //calculate percentile of incidents from BigOvalIncidentsArray

    //sort BigOvalIncidentsArray
    let sortedData = BigOvalIncidentsArray.sort((a, b) => {
      return a - b;
    });
    let percentile = 0;
    let index = 0;
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] > incidents) {
        index = i;
        break;
      }
    }
    percentile = (index / sortedData.length) * 100;
    return percentile.toFixed(2);
  };

  const calculateIratingPercentile = (rating) => {
    //calculate percentile of rating from AlliRatings
    //sort AlliRatings
    let sortedData = AlliRatings.sort((a, b) => {
      return a - b;
    });
    console.log(sortedData.length);

    //remove 1350s from sortedData
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] === 1350) {
        sortedData.splice(i, 1);
      }
    }

    let percentile = 0;
    let index = 0;
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] > rating) {
        index = i;
        break;
      }
    }
    percentile = (index / sortedData.length) * 100;
    return percentile.toFixed(2);
  };

  const calculateOvaliRatingPercentile = (rating) => {
    //calculate percentile of rating from AllOvaliRatings
    //sort AllOvaliRatings
    let sortedData = AllOvaliRatings.sort((a, b) => {
      return a - b;
    });

    //remove 1350s from sortedData
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] === 1350) {
        sortedData.splice(i, 1);
      }
    }

    let percentile = 0;
    let index = 0;
    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i] > rating) {
        index = i;
        break;
      }
    }
    percentile = (index / sortedData.length) * 100;
    return percentile.toFixed(2);
  };

  //   console.log(MemberData);
  // console.log(CareerData);

  if (IsLoaded || IsLoaded2) {
    try {
      return (
        <div>
          <Container>
            <Row className="memberNameRow">
              {MemberData.member[0].display_name}
            </Row>
            {/* *******ROAD CONTAINER******* */}
            <Container>
              <Row className="categoryNameRow">Road</Row>
            </Container>
            <Container className="road_container">
              <Row className="statsNameRow">
                <Col>iRating</Col>
                <Col>Starts</Col>
                <Col>Avg. Incidents</Col>
              </Row>
              <Row className="statsValueRow">
                <Col className="valueColItem">
                  {/* irating */}
                  <Row className="mem_stats_value_row">
                    {
                      MemberData.iRating_data[
                        MemberData.iRating_data.length - 1
                      ].value
                    }
                  </Row>
                  <Row>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">User Avg.</Row>
                      <Row>{RatingAvg}</Row>
                    </Col>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">Percentile</Row>
                      <Row>
                        {calculateIratingPercentile(
                          MemberData.iRating_data[
                            MemberData.iRating_data.length - 1
                          ].value
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col className="valueColItem">
                  {/* starts */}
                  <Row className="mem_stats_value_row">
                    {CareerData.stats[1].starts}
                  </Row>
                  <Row>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">User Avg.</Row>
                      <Row>{AvgRoadStarts.toFixed(0)}</Row>
                    </Col>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">Percentile</Row>
                      <Row>
                        {calculateStartsPercentile(CareerData.stats[1].starts)}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col className="valueColItem">
                  {/* incidents */}
                  <Row className="mem_stats_value_row">
                    {CareerData.stats[1].avg_incidents.toFixed(2)}
                  </Row>
                  <Row>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">User Avg.</Row>
                      <Row>{AvgRoadIncidents.toFixed(2)}</Row>
                    </Col>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">Percentile</Row>
                      <Row>
                        {calculateIncidentsPercentile(
                          CareerData.stats[1].avg_incidents
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="avgsNameRow">
                <Col>iRating / Starts</Col>
                <Col>iRating / Avg. Incidents</Col>
              </Row>
              <Row className="avgsValueRow">
                <Col className="valueColItem">
                  {/* iRating / Starts */}
                  {(
                    MemberData.iRating_data[MemberData.iRating_data.length - 1]
                      .value / CareerData.stats[1].starts
                  ).toFixed(2)}
                </Col>
                <Col>
                  {/* iRating / Avg. Incidents */}
                  {(
                    MemberData.iRating_data[MemberData.iRating_data.length - 1]
                      .value / CareerData.stats[1].avg_incidents
                  ).toFixed(2)}
                </Col>
              </Row>
            </Container>
            {/* *******OVAL CONTAINER******* */}
            <Container>
              <Row className="categoryNameRow">Oval</Row>
            </Container>
            <Container className="oval_container">
              <Row className="statsNameRow">
                <Col>iRating</Col>
                <Col>Starts</Col>
                <Col>Avg. Incidents</Col>
              </Row>
              <Row className="statsValueRow">
                <Col className="valueColItem">
                  {/* irating */}
                  <Row className="mem_stats_value_row">
                    {
                      MemberData.iRating_data_oval[
                        MemberData.iRating_data_oval.length - 1
                      ].value
                    }
                  </Row>
                  <Row>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">User Avg.</Row>
                      <Row>{OvalRatingAvg}</Row>
                    </Col>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">Percentile</Row>
                      <Row>
                        {calculateOvaliRatingPercentile(
                          MemberData.iRating_data_oval[
                            MemberData.iRating_data_oval.length - 1
                          ].value
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col className="valueColItem">
                  {/* starts */}
                  <Row className="mem_stats_value_row">
                    {CareerData.stats[0].starts}
                  </Row>
                  <Row>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">User Avg.</Row>
                      <Row>{AvgOvalStarts.toFixed(0)}</Row>
                    </Col>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">Percentile</Row>
                      <Row>
                        {calculateOvalStartsPercentile(
                          CareerData.stats[0].starts
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col className="valueColItem">
                  {/* incidents */}
                  <Row className="mem_stats_value_row">
                    {CareerData.stats[0].avg_incidents.toFixed(2)}
                  </Row>
                  <Row>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">User Avg.</Row>
                      <Row>{AvgOvalIncidents.toFixed(2)}</Row>
                    </Col>
                    <Col className="mem_stats_subCol">
                      <Row className="mem_stats_value_name_row">Percentile</Row>
                      <Row>
                        {calculateOvalIncidentsPercentile(
                          CareerData.stats[0].avg_incidents
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="avgsNameRow">
                <Col>iRating / Starts</Col>
                <Col>iRating / Avg. Incidents</Col>
              </Row>
              <Row className="avgsValueRow">
                <Col className="valueColItem">
                  {/* iRating / Starts */}
                  {(
                    MemberData.iRating_data_oval[
                      MemberData.iRating_data_oval.length - 1
                    ].value / CareerData.stats[0].starts
                  ).toFixed(2)}
                </Col>
                <Col>
                  {/* iRating / Avg. Incidents */}
                  {(
                    MemberData.iRating_data_oval[
                      MemberData.iRating_data_oval.length - 1
                    ].value / CareerData.stats[0].avg_incidents
                  ).toFixed(2)}
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      );
    } catch (error) {
      return (
        setTimeout(() => {
          // reload the page
          window.location.href = window.location.href;
        }, 3000),
        (<div>Pulling Stats... </div>)
      );
    }
  } else {
    if (!IsLoaded) {
      setTimeout(() => {
        setIsLoaded2(true);
      }, 1000);
    }
    return <div>Loading...</div>;
  }
}
