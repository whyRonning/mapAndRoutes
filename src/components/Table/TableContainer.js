import { connect } from "react-redux";
import { AntTable } from "./Table";
import { changeOrderPointAC, clickOnRowAC } from "../../store/mainReducer";
let MSTP = (state) => ({
  selectedRow: state.mainReducer.selectedRow,
  orders: state.mainReducer.orders,
  markers: state.mainReducer.markers,
});
export let TableContainer = connect(MSTP, { clickOnRowAC, changeOrderPointAC })(
  AntTable
);
