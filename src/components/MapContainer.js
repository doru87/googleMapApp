import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import axios from "axios";
import CardInfo from "./CardInfo";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  Image,
  Card,
} from "react-bootstrap";
import "../index.css";
import FilterCard from "./FilterCard";
import AddSpot from "./AddSpot";
import SearchLocation from "./SearchLocation";
import TableSpots from "./TableSpots";
import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export function MapContainer(props) {
  const [coordinates, setCoordinates] = React.useState({
    lat: 50.0,
    lng: 9.0,
  });

  const defaultMapOptions = {
    fullscreenControl: false,
  };
  let history = useHistory();

  const [zoom, setZoom] = React.useState(4);
  const [dataFromApi, setDataFromApi] = React.useState([]);
  const [cardId, setCardId] = React.useState();
  const [filterCardOpen, setfilterCardOpen] = React.useState(false);
  const [dataFilterCard, setDataFilterCard] = React.useState(" ");
  const [addSpotOpen, setAddSpotOpen] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [resultLocation, setResultLocation] = React.useState({});
  const [cardInfoOpen, setCardInfoOpen] = React.useState(false);
  const [dataFromLoginApi, setDataFromLoginApi] = React.useState([]);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [messageSearchLocation, setMessageSearchLocation] = React.useState("");
  const [dataFavouritesFromApi, setDataFavouritesFromApi] = React.useState([]);

  React.useEffect(() => {
    const data = async () => {
      await axios
        .get("https://6059f34db11aba001745d2c8.mockapi.io/spot")
        .then((response) => setDataFromApi(response.data));
    };
    data();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://6059f34db11aba001745d2c8.mockapi.io/login")
        .then((response) => {
          setDataFromLoginApi(response.data);
        });
    };
    getData();
  }, []);

  var datApi = dataFromLoginApi.slice(-1);
  var lastLogin = Object.assign({}, ...datApi);
  localStorage.setItem("user", lastLogin.username);

  const getIdCard = (event) => {
    setCardId(event.nativeEvent.path[2].id);
  };

  const displayFilterCard = () => {
    setfilterCardOpen(true);
  };

  const closeFilterCard = () => {
    setfilterCardOpen(false);
  };

  const displayCardInfo = () => {
    setCardInfoOpen(true);
  };

  const closeCardInfo = () => {
    setCardInfoOpen(false);
  };

  const GetDataFromFilterCard = (data) => {
    setDataFilterCard(data);
    setCoordinates(data[2]);
  };

  const displayAddSpot = (event) => {
    event.preventDefault();
    setAddSpotOpen(true);
  };

  const closeAddSpot = () => {
    setAddSpotOpen(false);
  };

  const GetDataFromSearchLocation = (data) => {
    React.useEffect(() => {
      dataFromApi.map((dataApi) => {
        if (dataApi.name.toLowerCase() == data.toLowerCase()) {
          var latlong = { lat: dataApi.lat, lng: dataApi.long };
          setResultLocation(latlong);
        }
      });
      setLocation(data);
    }, [data]);
  };

  const changeCenter = (coords, location) => {
    dataFromApi.map((dataApi) => {
      if (dataApi.name.toLowerCase() == location.toLowerCase()) {
        setCoordinates(coords);
        setZoom(8);
        const message = "";
        setMessageSearchLocation(message);
      } else {
        const message = "Location not found";
        setMessageSearchLocation(message);
      }
    });
  };

  React.useEffect(() => {
    const data = async () => {
      await axios
        .get("https://6059f34db11aba001745d2c8.mockapi.io/favourites")
        .then((response) => setDataFavouritesFromApi(response.data));
    };
    data();
  }, []);

  const displayLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const logoutUsername = () => {
    displayLogout();
  };

  const logout = () => {
    localStorage.removeItem("user");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser == null) {
      history.push({
        pathname: "/login",
      });
    }
  };

  return (
    <>
      <Container fluid>
        <Navbar bg="light" expand="lg">
          <Nav className="mr-auto mr-5 fontUsername">
            <Form inline>
              <Form.Label>{lastLogin.username}</Form.Label>
            </Form>
          </Nav>
          <Nav className="ml-auto mr-3 ">
            <Form inline>
              <Button
                type="submit"
                onClick={(event) => displayAddSpot(event)}
                className="mr-3"
              >
                ADD SPOT
              </Button>
            </Form>
            <Form inline>
              <FaUserCircle size={30} onClick={logoutUsername} />
            </Form>
          </Nav>
        </Navbar>

        <Card
          style={{
            position: "absolute",
            top: "50px",
            right: "30px",
            zIndex: "10",
            display: logoutOpen ? "block" : "none",
          }}
        >
          <Button onClick={logout} variant="danger">
            Logout
          </Button>
        </Card>

        <AddSpot addSpotOpen={addSpotOpen} closeAddSpot={closeAddSpot} />

        <Button
          className="filterButton"
          variant="light"
          onClick={displayFilterCard}
        >
          <Image src="/images/filter.png" className="imageFavourite" />
          Filters
        </Button>

        <FilterCard
          filterCardOpen={filterCardOpen}
          closeFilterCard={closeFilterCard}
          getData={GetDataFromFilterCard}
          dataFromApi={dataFromApi}
        />
        <div style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyC-9Lr0yAJP7M9RL6VDGVfQipHJKwXYMZs",
            }}
            center={coordinates}
            zoom={zoom}
            options={defaultMapOptions}
          >
            {dataFromApi.map((data, index) => (
              <Marker
                key={data.id}
                lat={data.lat}
                lng={data.long}
                text={data.name}
                setCardInfoOpen={displayCardInfo}
                getIdCard={getIdCard}
                id={data.id}
                dataFavouritesFromApi={dataFavouritesFromApi}
              />
            ))}
            {dataFromApi.map((data, index) => (
              <CardInfo
                key={data.id}
                id={data.id}
                name={data.name}
                country={data.country}
                lat={data.lat}
                lng={data.long}
                probability={data.probability}
                month={data.month}
                cardInfoOpen={cardInfoOpen}
                cardId={cardId}
                dataFilterCard={dataFilterCard}
                dataFavouritesFromApi={dataFavouritesFromApi}
                isFavourite={data.favourite}
                idFavourite={data.idFavourite}
                closeCardInfo={closeCardInfo}
                {...dataFavouritesFromApi.map((dataFavourites) => {
                  if (data.id == dataFavourites.spot) {
                    data.favourite = true;
                    data.idFavourite = dataFavourites.id;
                  }
                })}
              />
            ))}
          </GoogleMapReact>
        </div>
        <Container>
          <div className="containerSearch">
            <SearchLocation
              getData={GetDataFromSearchLocation}
              resultLocation={resultLocation}
              changeCenter={changeCenter}
              messageSearchLocation={messageSearchLocation}
            />
          </div>
          <TableSpots
            dataFromApi={dataFromApi}
            dataApi={dataFromApi}
            setDataFromApi={setDataFromApi}
          />
        </Container>
      </Container>
    </>
  );
}

export default MapContainer;
