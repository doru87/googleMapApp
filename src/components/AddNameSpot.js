import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Form } from "react-bootstrap";

export default function AddNameSpot({ getData }) {
  const [location, setLocation] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleChange = (value) => {
    setLocation(value.split(",")[0]);
  };

  const handleSelect = async (value) => {
    setLocation(value.split(",")[0]);
    setCountry(value.split(",")[1]);
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  };

  var dataToSend = [location, country, coordinates];
  getData(dataToSend);

  return (
    <div>
      <PlacesAutocomplete
        value={location}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <Form.Control
              type="text"
              className="textName mb-2"
              {...getInputProps({ placeholder: "Type address" })}
              defaultValue={location}
            />
            <div>
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
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
