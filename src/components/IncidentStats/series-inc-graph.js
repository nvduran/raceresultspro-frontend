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
import "../../styles/SeriesIncGraph.css";

export default function SeriesIncGraph() {
  const [filteredData, setFilteredData] = useState([]);
  // fetch and RETURN the sorted incident data from the server
  const fetchData = async () => {
    let response = await fetch(
      "https://irsite4-backend.herokuapp.com/memberstats/api/incidentssorted"
    );
    const data = await response.json();
    return data;
  };

  const filterData = (data) => {
    let excludes = [
      "Global Endurance Pure Driving School Series",
      "Daytona 24",
      "Creventic Endurance Series",
      "24 Hours of Nurburgring",
      "12 Hours of Sebring",
      "European Endurance Pure Driving School Series",
      "6 Hours of the Glen",
      "Bathurst 12 Hour",
      "Nurburgring Endurance Championship",
      "Roar Before the 24",
      "iRacing.com Indy 500 - Fixed",
      "eNASCAR Road to Pro Qual Series - Round 2",
      "eNASCAR Road to Pro Qual Series - Round 1",
      "10 Hours of Suzuka",
      "Petit Le Mans",
      "Peachtree Three benefiting the National MS Society",
      "24 Hours of Spa",
      "Bathurst 1000 AU",
      "Bathurst 1000 US",
      "4 Hours of Charlotte",
      "BMW SIM 120 Cup",
      "BMW Sim GT Cup",
      "Winter Derby",
      "Winter Derby - Fixed",
      "Throwback Cup",
      "iRacing.com Indy 500",
    ];
    // filter out the excluded series
    let filtered = data[0].sorted_avgs.filter(
      (incident) => !excludes.includes(incident.series)
    );
    // remove event_laps_complete with value of 0 from categoryArray
    filtered = filtered.filter(
      (incident) => incident.event_laps_complete !== 0
    );
    // remove any from categoryArray with "1" in the first character of series
    filtered = filtered.filter((incident) => incident.series.charAt(0) !== "1");

    console.log(filtered);
    setFilteredData(filtered);
  };

  // first time the component is rendered, fetch the data
  useEffect(() => {
    fetchData().then((data) => {
      filterData(data);
    });
  }, []);

  return (
    <div>
      <Container>
        <dl>
          {filteredData.map((inc) => {
            // (incidents / total corners)*1000
            let classString =
              "percentage percentage-" +
              Math.round(
                (inc.average_incidents /
                  (inc.event_laps_complete * inc.corners_per_lap)) *
                  1000
              );
            return (
              <div>
                <dd className={classString}>
                  <span className="text">{inc.series}</span>
                  <span className="text-after">
                    {Math.round(
                      (inc.average_incidents /
                        (inc.event_laps_complete * inc.corners_per_lap)) *
                        1000
                    )}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </div>

    //   <div>
    //     <dl>
    //       <dt>Browser market share June 2015</dt>
    //       <dd className="percentage percentage-11">
    //         <span className="text">IE 11: 11.33%</span>
    //       </dd>
    //       <dd className="percentage percentage-49">
    //         <span className="text">Chrome: 49.77%</span>
    //       </dd>
    //       <dd className="percentage percentage-16">
    //         <span className="text">Firefox: 16.09%</span>
    //       </dd>
    //       <dd className="percentage percentage-5">
    //         <span className="text">Safari: 5.41%</span>
    //       </dd>
    //       <dd className="percentage percentage-2">
    //         <span className="text">Opera: 1.62%</span>
    //       </dd>
    //       <dd className="percentage percentage-2">
    //         <span className="text">Android 4.4: 2%</span>
    //       </dd>
    //     </dl>
    //   </div>
  );
}
