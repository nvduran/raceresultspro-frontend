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
import "../../styles/IRatingGraphMobile.css";

export default function RatingGraphMobile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [irAvg, setIrAvg] = useState([]);
  const [irAvgMedian, setIrAvgMedian] = useState([]);
  const [sortedRatings, setSortedRatings] = useState([]);
  const [percentile, setPercentile] = useState(0);
  const [category, setCategory] = useState("road");
  const [chonks, setChonks] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [mobileLikely, setMobileLikely] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  let irArr_url =
    "https://irsite4-backend.herokuapp.com/memberstats/api/roadirating";
  let irArr_url_oval =
    "https://irsite4-backend.herokuapp.com/memberstats/api/ovalirating";
  let irArr_url_dirt =
    "https://irsite4-backend.herokuapp.com/memberstats/api/dirtirating";
  let irArr_url_dirt_oval =
    "https://irsite4-backend.herokuapp.com/memberstats/api/dirtovalirating";

  // fetch irating data and send array to sort function
  const fetchRatingArr = async (cat) => {
    let cat_url = "";
    if (cat === "road") {
      cat_url = irArr_url;
    } else if (cat === "oval") {
      cat_url = irArr_url_oval;
    } else if (cat === "dirt") {
      cat_url = irArr_url_dirt;
    } else if (cat === "dirt_oval") {
      cat_url = irArr_url_dirt_oval;
    }
    let iRatingArray = [];
    await fetch(cat_url)
      .then((res) => res.json())
      .then((data) => {
        iRatingArray = data;
        sortRatingArray(iRatingArray);
      });
  };

  // remove inactive and sort the array by iRating
  const sortRatingArray = async (irArr) => {
    setChonks(sliceIntoChunks(irArr));
    setSortedRatings(irArr);
    console.log(chonks);

    //calc averages here
    findAvgRating(irArr.filter((idx) => idx !== 1350));
    medianRating(irArr.filter((idx) => idx !== 1350));
  };

  function sliceIntoChunks(arr) {
    let res = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ];
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i];
      if (index > 0 && index <= 500) {
        res[0]++;
      } else if (index > 500 && index <= 550) {
        res[1]++;
      } else if (index > 550 && index <= 600) {
        res[2]++;
      } else if (index > 600 && index <= 650) {
        res[3]++;
      } else if (index > 650 && index <= 700) {
        res[4]++;
      } else if (index > 700 && index <= 750) {
        res[5]++;
      } else if (index > 750 && index <= 800) {
        res[6]++;
      } else if (index > 800 && index <= 850) {
        res[7]++;
      } else if (index > 850 && index <= 900) {
        res[8]++;
      } else if (index > 900 && index <= 950) {
        res[9]++;
      } else if (index > 950 && index <= 1000) {
        res[10]++;
      } else if (index > 1000 && index <= 1050) {
        res[11]++;
      } else if (index > 1050 && index <= 1100) {
        res[12]++;
      } else if (index > 1100 && index <= 1150) {
        res[13]++;
      } else if (index > 1150 && index <= 1200) {
        res[14]++;
      } else if (index > 1200 && index <= 1250) {
        res[15]++;
      } else if (index > 1250 && index <= 1300) {
        res[16]++;
      } else if (index > 1300 && index <= 1349) {
        res[17]++;
      } else if (index > 1351 && index <= 1400) {
        res[18]++;
      } else if (index > 1400 && index <= 1450) {
        res[19]++;
      } else if (index > 1450 && index <= 1500) {
        res[20]++;
      } else if (index > 1500 && index <= 1550) {
        res[21]++;
      } else if (index > 1550 && index <= 1600) {
        res[22]++;
      } else if (index > 1600 && index <= 1650) {
        res[23]++;
      } else if (index > 1650 && index <= 1700) {
        res[24]++;
      } else if (index > 1700 && index <= 1750) {
        res[25]++;
      } else if (index > 1750 && index <= 1800) {
        res[26]++;
      } else if (index > 1800 && index <= 1850) {
        res[27]++;
      } else if (index > 1850 && index <= 1900) {
        res[28]++;
      } else if (index > 1900 && index <= 1950) {
        res[29]++;
      } else if (index > 1950 && index <= 2000) {
        res[30]++;
      } else if (index > 2000 && index <= 2050) {
        res[31]++;
      } else if (index > 2050 && index <= 2100) {
        res[32]++;
      } else if (index > 2100 && index <= 2150) {
        res[33]++;
      } else if (index > 2150 && index <= 2200) {
        res[34]++;
      } else if (index > 2200 && index <= 2250) {
        res[35]++;
      } else if (index > 2250 && index <= 2300) {
        res[36]++;
      } else if (index > 2300 && index <= 2350) {
        res[37]++;
      } else if (index > 2350 && index <= 2400) {
        res[38]++;
      } else if (index > 2400 && index <= 2450) {
        res[39]++;
      } else if (index > 2450 && index <= 2500) {
        res[40]++;
      } else if (index > 2500 && index <= 2550) {
        res[41]++;
      } else if (index > 2550 && index <= 2600) {
        res[42]++;
      } else if (index > 2600 && index <= 2650) {
        res[43]++;
      } else if (index > 2650 && index <= 2700) {
        res[44]++;
      } else if (index > 2700 && index <= 2750) {
        res[45]++;
      } else if (index > 2750 && index <= 2800) {
        res[46]++;
      } else if (index > 2800 && index <= 2850) {
        res[47]++;
      } else if (index > 2850 && index <= 2900) {
        res[48]++;
      } else if (index > 2900 && index <= 2950) {
        res[49]++;
      } else if (index > 2950 && index <= 3000) {
        res[50]++;
      } else if (index > 3000 && index <= 3050) {
        res[51]++;
      } else if (index > 3050 && index <= 3100) {
        res[52]++;
      } else if (index > 3100 && index <= 3150) {
        res[53]++;
      } else if (index > 3150 && index <= 3200) {
        res[54]++;
      } else if (index > 3200 && index <= 3250) {
        res[55]++;
      } else if (index > 3250 && index <= 3300) {
        res[56]++;
      } else if (index > 3300 && index <= 3350) {
        res[57]++;
      } else if (index > 3350 && index <= 3400) {
        res[58]++;
      } else if (index > 3400 && index <= 3450) {
        res[59]++;
      } else if (index > 3450 && index <= 3500) {
        res[60]++;
      } else if (index > 3500 && index <= 3550) {
        res[61]++;
      } else if (index > 3550 && index <= 3600) {
        res[62]++;
      } else if (index > 3600 && index <= 3650) {
        res[63]++;
      } else if (index > 3650 && index <= 3700) {
        res[64]++;
      } else if (index > 3700 && index <= 3750) {
        res[65]++;
      } else if (index > 3750 && index <= 3800) {
        res[66]++;
      } else if (index > 3800 && index <= 3850) {
        res[67]++;
      } else if (index > 3850 && index <= 3900) {
        res[68]++;
      } else if (index > 3900 && index <= 3950) {
        res[69]++;
      } else if (index > 3950 && index <= 4000) {
        res[70]++;
      } else if (index > 4000) {
        res[71]++;
      }
    }
    setIsLoaded(true);
    return res;
  }

  const medianRating = (arr) => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);

    let answ =
      arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    setIrAvgMedian(answ);
  };

  const findAvgRating = (arr) => {
    let answer = (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
    console.log(answer);
    setIrAvg(answer);
    // setIsLoaded(true);
    return answer.toString();
  };

  useEffect(() => {
    fetchRatingArr(category);
  }, []);

  return (
    <dl>
      {chonks.map((chunk, index) => {
        let classString = "percentageir percentageir-" + chunk;
        if (index === 0) {
          return (
            <div key={index}>
              <dd className={classString}>
                <span className="text">0-500</span>
              </dd>
            </div>
          );
        } else if (index > 71) {
        } else if (index === 71) {
          return (
            <div key={index}>
              <dd className={classString}>
                <span className="text">4000+</span>
              </dd>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <dd className={classString}>
                <span className="text">
                  {index * 50 - 50 + 500 + "-" + (index * 50 + 500)}
                </span>
              </dd>
            </div>
          );
        }
      })}

      {/* {filteredData.map((inc) => {
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
        })} */}
    </dl>
  );
}
