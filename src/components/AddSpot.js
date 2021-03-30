import React from "react";

import { Button, Form, Card, Row } from "react-bootstrap";
import "../index.css";
import AddNameSpot from "./AddNameSpot";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function AddSpot({ addSpotOpen, closeAddSpot }) {
  const [location, setLocation] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [startDate1, setStartDate1] = React.useState(new Date());
  const [startDate2, setStartDate2] = React.useState(new Date());

  const GetDataFromAddNameSpot = (data) => {
    React.useEffect(() => {
      setLocation(data[0]);
      setCountry(data[1]);
      setCoordinates(data[2]);
    }, [data[0], data[1], data[2]]);
  };

  const addSpot = () => {
    var dataObject = {
      name: location,
      country: country.trim(),
      lat: coordinates.lat,
      long: coordinates.lng,
      probability: Math.floor(Math.random() * 100) + 1,
      month:
        document.querySelector(".datePicker1").value +
        "-" +
        document.querySelector(".datePicker2").value,
    };
    axios.post("https://6059f34db11aba001745d2c8.mockapi.io/spot", dataObject);

    closeAddSpot();

    setTimeout(function () {
      window.location.reload(1);
    }, 1000);
  };

  return (
    <div className="addSpot">
      <Card
        border="primary"
        style={{
          width: "14rem",
          display: addSpotOpen ? "block" : "none",
        }}
      >
        <Card.Body>
          <Form.Label>Name</Form.Label>
          <AddNameSpot getData={GetDataFromAddNameSpot} />
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="mb-2"
            defaultValue={country}
          />
          <Form.Label>High Season</Form.Label>

          <Row>
            <div style={{ display: "flex" }}>
              <Form.Label className="ml-3">Start</Form.Label>
              <DatePicker
                selected={startDate1}
                onChange={(date) => setStartDate1(date)}
                dateFormat="MMMM"
                className="datePicker1"
              />
            </div>
          </Row>

          <Row>
            <div style={{ display: "flex" }}>
              <Form.Label className="ml-3">End</Form.Label>
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
                dateFormat="MMMM"
                className="datePicker2"
              />
            </div>
          </Row>

          <Card.Img
            variant="top"
            src="/images/2021-03-28_144751.jpg"
            style={{ width: "80%" }}
          />
          <Button
            variant="danger"
            className="cancelHref"
            onClick={closeAddSpot}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="confirmHref"
            onClick={addSpot}
            size="sm"
          >
            Confirm
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddSpot;
