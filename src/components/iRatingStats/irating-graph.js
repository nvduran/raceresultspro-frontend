import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import { defaults } from "chart.js";
import "chart.js/auto";

let irArr_url =
  "https://irsite4-backend.herokuapp.com/memberstats/api/roadirating";
let irArr_url_oval =
  "https://irsite4-backend.herokuapp.com/memberstats/api/ovalirating";
let irArr_url_dirt =
  "https://irsite4-backend.herokuapp.com/memberstats/api/dirtirating";
let irArr_url_dirt_oval =
  "https://irsite4-backend.herokuapp.com/memberstats/api/dirtovalirating";

export default function RatingGraph(
  {
    // import the state and setState functions from props
    // SearchScreenState,
    // setSearchScreenState,
    // custId,
    // setCustId,
    // setGraphScreenState,
    // setMemberStatState,
  }
) {
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

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    if (window.innerWidth * 1.5 < window.innerHeight) {
      setMobileLikely(true);
    } else {
      setMobileLikely(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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
      });

    sortRatingArray(iRatingArray);
  };

  // remove inactive and sort the array by iRating
  const sortRatingArray = async (irArr) => {
    setChonks(sliceIntoChunks(irArr));
    setSortedRatings(irArr);
    // setIsLoaded(true);
    console.log(irArr);

    findAvgRating(irArr.filter((idx) => idx !== 1350));
    medianRating(irArr.filter((idx) => idx !== 1350));
  };

  function calcPercentile(arr, ir) {
    let data = arr.filter((idx) => idx !== 1350);
    for (let i = 0; i < data.length; i++) {
      if (ir >= data[i]) {
        let answer = ((data.length - i) / data.length) * 100;
        return answer.toFixed(2);
      }
    }
  }

  useEffect(() => {
    fetchRatingArr("road");
    // setPercentile90(percentile(sortedRatings, 0.9));
    // setPercentile50(percentile(sortedRatings, 0.6));
  }, []);

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

  //font family
  defaults.font.family = "sans-serif";
  defaults.font.size = 11;
  //options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "iRating of Active Users",
      },
    },
    scales: {
      xAxes: {
        ticks: {
          autoSkip: true,
          maxRotation: 80,
          minRotation: 60,
        },
      },
      yAxes: {
        ticks: {
          display: false,
        },
      },
    },
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

  console.log(chonks.length);
  let data1 = {
    labels: [
      "<500",
      "500-550",
      "550-600",
      "600-650",
      "650-700",
      "700-750",
      "750-800",
      "800-850",
      "850-900",
      "900-950",
      "950-1000",
      "1000-1050",
      "1050-1100",
      "1100-1150",
      "1150-1200",
      "1200-1250",
      "1250-1300",
      "1300-1350",
      "1350-1400",
      "1400-1450",
      "1450-1500",
      "1500-1550",
      "1550-1600",
      "1600-1650",
      "1650-1700",
      "1700-1750",
      "1750-1800",
      "1800-1850",
      "1850-1900",
      "1900-1950",
      "1950-2000",
      "2000-2050",
      "2050-2100",
      "2100-2150",
      "2150-2200",
      "2200-2250",
      "2250-2300",
      "2300-2350",
      "2350-2400",
      "2400-2450",
      "2450-2500",
      "2500-2550",
      "2550-2600",
      "2600-2650",
      "2650-2700",
      "2700-2750",
      "2750-2800",
      "2800-2850",
      "2850-2900",
      "2900-2950",
      "2950-3000",
      "3000-3050",
      "3050-3100",
      "3100-3150",
      "3150-3200",
      "3200-3250",
      "3250-3300",
      "3300-3350",
      "3350-3400",
      "3400-3450",
      "3450-3500",
      "3500-3550",
      "3550-3600",
      "3600-3650",
      "3650-3700",
      "3700-3750",
      "3750-3800",
      "3800-3850",
      "3850-3900",
      "3900-3950",
      "3950-4000",
      "4000+",
    ],
    datasets: [
      {
        label: "# of Active Drivers*",
        data: [
          chonks[0],
          chonks[1],
          chonks[2],
          chonks[3],
          chonks[4],
          chonks[5],
          chonks[6],
          chonks[7],
          chonks[8],
          chonks[9],
          chonks[10],
          chonks[11],
          chonks[12],
          chonks[13],
          chonks[14],
          chonks[15],
          chonks[16],
          chonks[17],
          chonks[18],
          chonks[19],
          chonks[20],
          chonks[21],
          chonks[22],
          chonks[23],
          chonks[24],
          chonks[25],
          chonks[26],
          chonks[27],
          chonks[28],
          chonks[29],
          chonks[30],
          chonks[31],
          chonks[32],
          chonks[33],
          chonks[34],
          chonks[35],
          chonks[36],
          chonks[37],
          chonks[38],
          chonks[39],
          chonks[40],
          chonks[41],
          chonks[42],
          chonks[43],
          chonks[44],
          chonks[45],
          chonks[46],
          chonks[47],
          chonks[48],
          chonks[49],
          chonks[50],
          chonks[51],
          chonks[52],
          chonks[53],
          chonks[54],
          chonks[55],
          chonks[56],
          chonks[57],
          chonks[58],
          chonks[59],
          chonks[60],
          chonks[61],
          chonks[62],
          chonks[63],
          chonks[64],
          chonks[65],
          chonks[66],
          chonks[67],
          chonks[68],
          chonks[69],
          chonks[70],
          chonks[71],
        ],

        backgroundColor: ["rgba(6,214,160, 0.8)", "rgba(150, 150, 150, 0.6)"],
        borderColor: ["rgba(6,214,160, 0.8)", "rgba(150, 150, 150, 0.6)"],
        borderWidth: 1,
        barThickness: 10,
        maxBarThickness: 10,
        minBarLength: 2,
      },
    ],
  };

  const handleChange = (e) => {
    setPercentile(calcPercentile(sortedRatings, e.target.value));
    // setCustId(e.target.value);
  };

  const handleCatChange = (cat) => {
    setCategory(cat);
    fetchRatingArr(cat);
    setIsLoaded(false);
    setPercentile(0);
  };

  if (isLoaded) {
    // rename the category
    let categoryText = "";
    if (category === "road") {
      categoryText = "Road";
    } else if (category === "oval") {
      categoryText = "Oval";
    } else if (category === "dirt") {
      categoryText = "Dirt Road";
    } else if (category === "dirt_oval") {
      categoryText = "Dirt Oval";
    }
    return (
      <div>
        <Row>
          <Col>
            <DropdownButton
              id="dropdown-basic-button"
              title={categoryText}
              className="category_dropdown_graph"
            >
              <Dropdown.Item
                onClick={() => {
                  handleCatChange("road");
                }}
                className="category_dropdown_graph"
              >
                Road
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleCatChange("oval");
                }}
              >
                Oval
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleCatChange("dirt");
                }}
              >
                Dirt Road
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleCatChange("dirt_oval");
                }}
              >
                Dirt Oval
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

        {mobileLikely ? (
          <Row className="mobile_graph_ask">
            Consider rotating the screen for a better graph.
          </Row>
        ) : null}
        <Container className="graph_container">
          <Bar data={data1} options={options}></Bar>
        </Container>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <Row>
          <Col className="loading_text">
            Loading Graph. This could take a few seconds...
          </Col>
        </Row>
      </div>
    );
  }
}
