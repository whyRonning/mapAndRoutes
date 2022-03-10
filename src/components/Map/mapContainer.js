import { connect } from "react-redux";
import { RouteMap } from "./Map";
let MSTP = (state) => ({
  path: state.mainReducer.path,
});
export let RouteMapContainer = connect(MSTP)(RouteMap);
