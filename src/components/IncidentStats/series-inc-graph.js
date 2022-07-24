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
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "../../styles/SeriesIncGraph.css";

export default function SeriesIncGraph() {
  const [filteredData, setFilteredData] = useState([]);
  const [sortChoice, setSortChoice] = useState("ipc");
  const [categoryChoice, setCategoryChoice] = useState("Road");
  const [isLoaded, setIsLoaded] = useState(false);
  // fetch and RETURN the sorted incident data from the server
  const fetchData = async () => {
    let response = await fetch(
      "https://irsite4-backend.herokuapp.com/memberstats/api/incidentssorted"
    );
    const data = await response.json();
    return data;
  };

  const filterData = (data, choice) => {
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
      "24 Heures du Fun",
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
    // filter out data except where license_category === categoryChoice
    filtered = filtered.filter(
      (incident) => incident.license_category === choice
    );

    setFilteredData(filtered);
    setIsLoaded(true);
  };

  const handleCatChange = (choice) => {
    //replace spaces with underscores in choice
    choice = choice.replace(/ /g, "_");
    setIsLoaded(false);
    setCategoryChoice(choice);
    fetchData().then((data) => {
      filterData(data, choice);
    });
  };

  // sort the data by the choice of sort
  if (sortChoice === "ipc") {
    // sort filteredData by (average_incidents / (event_laps_complete * corners_per_lap))
    filteredData.sort((a, b) => {
      return (
        b.average_incidents / (b.event_laps_complete * b.corners_per_lap) -
        a.average_incidents / (a.event_laps_complete * a.corners_per_lap)
      );
    });
  }

  // first time the component is rendered, fetch the data
  useEffect(() => {
    fetchData().then((data) => {
      filterData(data, categoryChoice);
    });
  }, []);

  if (isLoaded) {
    return (
      <div>
        <Container className="graph-container">
          <DropdownButton
            id="dropdown-basic-button"
            title={categoryChoice}
            className="category_dropdown_graph"
          >
            {["Road", "Oval", "Dirt Road", "Dirt Oval"].map((cat) => {
              return (
                <Dropdown.Item
                  onClick={() => handleCatChange(cat)}
                  key={cat}
                  className="category_dropdown_graph"
                >
                  {cat}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <dl>
            {filteredData.map((inc) => {
              // incidents per 1000 corners
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
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}
