import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";

export default function SearchLocation({
  getData,
  changeCenter,
  resultLocation,
  messageSearchLocation,
}) {
  const [location, setLocation] = React.useState(" ");

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
              <Col sm={8}>
                <Form.Control
                  type="text"
                  className="mb-2"
                  {...getInputProps({ placeholder: "Type location (city)" })}
                  defaultValue={location}
                />
                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </Col>
              <Button
                size="sm"
                style={{ height: "37px" }}
                variant="dark"
                onClick={() => changeCenter(resultLocation, location)}
              >
                Search
              </Button>
            </Row>
          </Container>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

