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
  Image,
} from "react-bootstrap";
import "../../styles/SearchMember.css";
import ui_id_img from "../../assets/ui_id.png";
import url_id_img from "../../assets/url_id.png";

let member_url = "https://irsite4-backend.herokuapp.com/memberstats/info/";

export default function SearchMember({
  // import the state and setState functions from props
  SearchScreenState,
  setSearchScreenState,
  custId,
  setCustId,
  setGraphScreenState,
  setMemberStatState,
}) {
  const [HelperScreenState, setHelperScreenState] = useState(false);
  // handle form input change
  const handleChange = (e) => {
    setCustId(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("submit");
    //validate input
    if (custId.length > 6 || custId.length < 5) {
      alert("Customer ID must be 5 or 6 digits");
    } else {
      // hide search screen
      window.location.href = "/memberstats/" + custId;
    }
  };

  const handleIdFinder = (e) => {
    setHelperScreenState(true);
  };

  const handleExamples = (id) => {
    setCustId(id);
    window.location.href = "/memberstats/" + id;
    console.log("handling examples");
  };

  if (!HelperScreenState) {
    return (
      <div>
        <Row>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="enter-id-text">
                Enter Your Customer ID
              </Form.Label>

              {/* FORM INPUT AREA */}
              <Col className="input-form-col">
                <Form.Control
                  className="input-form"
                  type="text"
                  value={custId}
                  onChange={handleChange}
                />
              </Col>

              <Form.Text className="text-muted" onClick={handleIdFinder}>
                Where do I find my customer ID?
              </Form.Text>
            </Form.Group>

            <Button className="submit-button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Row>
        <Row className="example_users_row">
          <Col>
            <Row className="example_users_top">
              <p1>Just looking?</p1>
            </Row>
            <Row
              className="example_users_text"
              onClick={() => handleExamples(168966)}
            >
              <p1>
                <i>Max Verstappen - 168966</i>
              </p1>
            </Row>
            <Row
              className="example_users_text"
              onClick={() => handleExamples(95469)}
            >
              <p1>
                <i>Jimmy Broadbent - 95469</i>
              </p1>
            </Row>
            <Row
              className="example_users_text"
              onClick={() => handleExamples(370235)}
            >
              <p1>
                <i>Dale Earnhardt Jr - 370235</i>
              </p1>
            </Row>
            <Row
              className="example_users_text"
              onClick={() => handleExamples(87961)}
            >
              <p1>
                <i>Rubens Barrichello - 87961</i>
              </p1>
            </Row>
            <Row
              className="example_users_text"
              onClick={() => handleExamples(130979)}
            >
              <p1>
                <i>Lando Norris - 130979</i>
              </p1>
            </Row>
            <Row
              className="example_users_text"
              onClick={() => handleExamples(444212)}
            >
              <p1>
                <i>Tony Kanaan - 444212</i>
              </p1>
            </Row>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div>
        <Row>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="enter-id-text">
                Enter Your Customer ID
              </Form.Label>

              {/* FORM INPUT AREA */}
              <Col className="input-form-col">
                <Form.Control
                  className="input-form"
                  type="text"
                  value={custId}
                  onChange={handleChange}
                />
              </Col>

              <Form.Text className="text-muted">
                Where do I find my customer ID?
              </Form.Text>
            </Form.Group>

            <Button className="submit-button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Row>

        <Row>
          <Col>
            <Row>
              <Container>
                <Row className="helper_text">
                  <p1>
                    You can find your Customer ID in the desktop UI by clicking
                    on your helmet icon in the top right corner, then clicking{" "}
                    <b>Profile</b>
                  </p1>
                </Row>

                <Image className="ui_id_img" src={ui_id_img}></Image>
              </Container>
            </Row>
            <Row>
              <Container>
                <Row className="helper_text">
                  <p1>
                    <b>Or</b>, if you use the iRacing Member Site, you can visit
                    your profile page and view your Customer ID in the URL
                  </p1>
                </Row>

                <Image className="url_id_img" src={url_id_img}></Image>
              </Container>
            </Row>
          </Col>
        </Row>
        <Row>
          <Button
            className="back-button"
            onClick={() => setHelperScreenState(false)}
          >
            Close
          </Button>
        </Row>
      </div>
    );
  }
}
