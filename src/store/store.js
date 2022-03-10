import {applyMiddleware, combineReducers, createStore} from "redux";
import {mainSaga,mainReducer} from "./mainReducer";
import createSagaMiddleware from "redux-saga"
let reducer=combineReducers({mainReducer});
let Saga=createSagaMiddleware()
export let store=createStore(reducer,applyMiddleware(Saga))
Saga.run(mainSaga)