import React from "react";
import { Button, Form, Image, Card } from "react-bootstrap";
import "../index.css";
import { FaWindowClose } from "react-icons/fa";

function FilterCard({ filterCardOpen, closeFilterCard, getData, dataFromApi }) {
  const countryRef = React.useRef(React.createRef());
  const windRef = React.useRef(React.createRef());
  const [message, setMessage] = React.useState("");

  const getValueInput = () => {
    dataFromApi.map((data) => {
      if (
        data.country.toLowerCase() == countryRef.current.value.toLowerCase() ||
        data.probability == windRef.current.value
      ) {
        var coords = { lat: data.lat, lng: data.long };
        const ref = [countryRef.current.value, windRef.current.value, coords];
        getData(ref);
      } else {
        var message = "Data not found!";
        setMessage(message);
      }
    });
  };

  return (
    <div className="filterCardInfo">
      <Card
        border="primary"
        style={{
          width: "14rem",
          display: filterCardOpen ? "block" : "none",
        }}
      >
        <Card.Header>
          <Image src="/images/filter.png" className="imageFavourite" />
          Filters
        </Card.Header>
        <Card.Body>
          <FaWindowClose
            size={20}
            onClick={closeFilterCard}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          />
          <Card.Title className="mb-2">{message}</Card.Title>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="mb-2"
            ref={countryRef}
          />
          <Form.Label>Wind Probability</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="mb-2"
            ref={windRef}
          />
          <Button variant="secondary" onClick={getValueInput} size="sm">
            Apply filter
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FilterCard;
