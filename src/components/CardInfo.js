import React from "react";

import axios from "axios";

import moment from "moment";
import { FaWindowClose } from "react-icons/fa";
import { Row, Image, Card, Button } from "react-bootstrap";

function CardInfo({
  cardInfoOpen,
  cardId,
  id,
  name,
  country,
  lat,
  lng,
  month,
  probability,
  dataFilterCard,
  dataFavouritesFromApi,
  isFavourite,
  idFavourite,
  closeCardInfo,
}) {
  var datapi = dataFavouritesFromApi.slice(-1);
  var lastFavoriteSpot = Object.assign({}, ...datapi);

  const addToFavourites = (id) => {
    var dataObject = {
      spot: id,
      createdAt: moment().format(),
      id: lastFavoriteSpot.id++,
    };
    axios.post(
      "https://6059f34db11aba001745d2c8.mockapi.io/favourites",
      dataObject
    );
    closeCardInfo();

    setTimeout(function () {
      window.location.reload(1);
    }, 1000);
  };
  const removeFromFavourites = async (id) => {
    try {
      await axios.delete(
        `https://6059f34db11aba001745d2c8.mockapi.io/favourites/${id}`
      );
    } catch (error) {
      console.log(error);
    }
    closeCardInfo();
    window.location.reload();
  };

  return (
    <Card
      border="primary"
      style={{
        width: "12rem",
        display:
          (cardId === id && cardInfoOpen) ||
          dataFilterCard[0].toLowerCase() === country.toLowerCase() ||
          dataFilterCard[1] === probability
            ? "block"
            : "none",
      }}
    >
      <Card.Body>
        <FaWindowClose
          size={20}
          onClick={closeCardInfo}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        />
        <Row>
          <Card.Title className="mb-3 ml-3">{name}</Card.Title>
          {isFavourite ? (
            <Image src="/images/star-on.png" className="imageFavourite" />
          ) : (
            <Image src="/images/star-off.png" className="imageFavourite" />
          )}
        </Row>
        <Card.Text className="mb-2">{country}</Card.Text>
        <Card.Text className="mb-0 titleCard">WIND PROBABILITY</Card.Text>
        <Card.Text>{probability}%</Card.Text>
        <Card.Text className="mb-0 titleCard">LATITUDE</Card.Text>
        <Card.Text>{lat}</Card.Text>
        <Card.Text className="mb-0 titleCard">LONGITUDE</Card.Text>
        <Card.Text>{lng}</Card.Text>
        <Card.Text className="mb-0 titleCard">WHEN TO GO</Card.Text>
        <Card.Text>{month}</Card.Text>
      </Card.Body>
      {isFavourite ? (
        <Button
          variant="danger"
          size="sm"
          type="submit"
          onClick={() => removeFromFavourites(idFavourite)}
          className="mb-3"
        >
          Remove from favourites
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          type="submit"
          onClick={() => addToFavourites(id)}
          className="mb-3"
        >
          Add to favourites
        </Button>
      )}
    </Card>
  );
}

export default CardInfo;
