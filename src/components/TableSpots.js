import React from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { Container, Table, Form } from "react-bootstrap";
import axios from "axios";

function TableSpots({ dataFromApi, setDataFromApi }) {
  const [dataApi, setDatapi] = React.useState([]);
  const [finalData, setFinalData] = React.useState([]);
  const [searchLocation, setSearchLocation] = React.useState("");
  const [location, setLocation] = React.useState([]);

  React.useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://6059f34db11aba001745d2c8.mockapi.io/spot")
        .then((response) => setDatapi(response.data));
    };
    getdata();
  }, []);

  React.useEffect(() => {
    setDataFromApi(finalData);
  }, []);

  const sortData = (sortBy) => {
    var data = [];
    if (sortBy == "nameAsc") {
      data = dataFromApi.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy == "nameDesc") {
      data = dataFromApi.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy == "countryAsc") {
      data = dataFromApi.sort((a, b) => a.country.localeCompare(b.country));
    } else if (sortBy == "countryDesc") {
      data = dataFromApi.sort((a, b) => b.country.localeCompare(a.country));
    } else if (sortBy == "latitudeAsc") {
      data = dataFromApi.sort((a, b) => a.lat - b.lat);
    } else if (sortBy == "latitudeDesc") {
      data = dataFromApi.sort((a, b) => b.lat - a.lat);
    } else if (sortBy == "longitudeAsc") {
      data = dataFromApi.sort((a, b) => a.long - b.long);
    } else if (sortBy == "longitudeDesc") {
      data = dataFromApi.sort((a, b) => b.long - a.long);
    } else if (sortBy == "windAsc") {
      data = dataFromApi.sort((a, b) => a.probability - b.probability);
    } else if (sortBy == "windDesc") {
      data = dataFromApi.sort((a, b) => b.probability - a.probability);
    } else if (sortBy == "monthAsc") {
      data = dataFromApi.sort((a, b) => a.month.localeCompare(b.month));
    } else if (sortBy == "monthDesc") {
      data = dataFromApi.sort((a, b) => b.month.localeCompare(a.month));
    }

    setFinalData(data);
    setFinalData([]);
  };

  React.useEffect(() => {
    setDataFromApi(location);
  }, [location]);

  const handleChange = (event) => {
    setSearchLocation(event.target.value);
    const searchResult = dataFromApi.filter((data) =>
      data.name.toLowerCase().includes(searchLocation.toLowerCase())
    );
    if (event.target.value === "") {
      setLocation(dataApi);
    } else {
      setLocation(searchResult);
    }
  };

  return (
    <Container fluid className="mt-5 mb-5">
      <div className="searchField">
        <Form.Control
          type="text"
          placeholder="Search"
          className="mb-2"
          onChange={handleChange}
        />
      </div>
      <Table striped bordered hover size="md" variant="dark">
        <thead>
          <tr>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                Name
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                  }}
                >
                  <MdArrowDropUp onClick={() => sortData("nameAsc")} />
                  <MdArrowDropDown onClick={() => sortData("nameDesc")} />
                </div>
              </div>
            </th>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                Country
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                  }}
                >
                  <MdArrowDropUp onClick={() => sortData("countryAsc")} />
                  <MdArrowDropDown onClick={() => sortData("countryDesc")} />
                </div>
              </div>
            </th>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                Latitude
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                  }}
                >
                  <MdArrowDropUp onClick={() => sortData("latitudeAsc")} />
                  <MdArrowDropDown onClick={() => sortData("latitudeDesc")} />
                </div>
              </div>
            </th>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                Longitude
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                  }}
                >
                  <MdArrowDropUp onClick={() => sortData("longitudeAsc")} />
                  <MdArrowDropDown onClick={() => sortData("longitudeDesc")} />
                </div>
              </div>
            </th>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                Wind Prob.
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                  }}
                >
                  <MdArrowDropUp onClick={() => sortData("windAsc")} />
                  <MdArrowDropDown onClick={() => sortData("windDesc")} />
                </div>
              </div>
            </th>
            <th>
              <div style={{ display: "flex", flexDirection: "row" }}>
                When to go
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                  }}
                >
                  <MdArrowDropUp onClick={() => sortData("monthAsc")} />
                  <MdArrowDropDown onClick={() => sortData("monthDesc")} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataFromApi.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.country}</td>
                <td>{data.lat}</td>
                <td>{data.long}</td>
                <td>{data.probability}</td>
                <td>{data.month}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableSpots;
