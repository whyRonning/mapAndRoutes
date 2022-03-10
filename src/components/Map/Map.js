import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
let StyledMap = styled(MapContainer)`
  height: 97vh;
  width: 80vw;
`;
export let RouteMap = (props) => {
  let Route = createControlComponent(() => {
    return L.Routing.control({
      waypoints:
        props.path !== null
          ? [L.latLng(...props.path[0]), L.latLng(...props.path[1])]
          : [],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
    });
  });

  return (
    <StyledMap
      doubleClickZoom={false}
      zoom={8}
      center={[55.87883391988633, 37.68294060905703]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Route />
    </StyledMap>
  );
};
