import {RouteMapContainer} from "./components/Map/mapContainer";
import {TableContainer} from "./components/Table/TableContainer";
import styled from "styled-components";
import {useState} from "react";

let Main = styled.main`
  display: grid;
  grid-template-columns:${props => {
    return props.width + "% " + (100 - Number(props.width) + "%")
  }};
`
let Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  position: absolute;

  ::-webkit-slider-runnable-track {
    height: .1px;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    opacity: 0;
    border: 1px solid #000000;
    height: 97vh;
    width: 50px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
`
export let App = () => {
    let [width, setWidth] = useState("34")
    return (
        <Main width={width}>
            <TableContainer/>
            <Range min={0} value={width} onChange={(e) => {
                if (Number(e.target.value) > 20 && Number(e.target.value < 80)) {
                    setWidth(e.target.value)
                }
            }} max={100} type={"range"}/>
            <RouteMapContainer />
        </Main>
    )
}

