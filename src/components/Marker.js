import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function Marker(props) {
  const [color, setColor] = React.useState("");
  React.useEffect(() => {
    props.dataFavouritesFromApi.forEach((data) => {
      if (data.spot == props.id) {
        setColor("yellow");
      }
    });
  }, [props.dataFavouritesFromApi]);

  return (
    <div
      style={{ color: color }}
      id={props.id}
      onClick={(event) => {
        props.setCardInfoOpen();
        props.getIdCard(event);
      }}
    >
      <FaMapMarkerAlt size={50} />
    </div>
  );
}

export default Marker;
