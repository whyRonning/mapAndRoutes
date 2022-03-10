import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {createGlobalStyle} from "styled-components";
import "antd/dist/antd.min.css"
let Style=createGlobalStyle`
  .leaflet-routing-alt{
    display: none;
  }

`
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Style/>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();