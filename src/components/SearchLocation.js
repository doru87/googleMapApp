import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";

export default function SearchLocation({
  getData,
  changeCenter,
  resultLocation,
  messageSearchLocation,
}) {
  const [location, setLocation] = React.useState();

  const handleSelect = async (value) => {
    setLocation(value.split(",")[0]);
  };

  getData(location);

  return (
    <div>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <Container>
            <Row>
              <Card.Title className="mb-2">{messageSearchLocation}</Card.Title>
            </Row>
            <Row>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  className="mb-2"
                  {...getInputProps({ placeholder: "Type location (city)" })}
                  defaultValue={location}
                />
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </Col>
              <Col sm={4}>
                <Button
                  variant="dark"
                  onClick={() => changeCenter(resultLocation, location)}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
