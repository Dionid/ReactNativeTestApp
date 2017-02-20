/**
 * Created by dionid on 20.02.17.
 */


import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import cards, * as cardSelectors from "./cards";
import historyList, * as historyListSelectors from "./historyList";

const rootReducer = combineReducers({
    cards,
    historyList
});

function configureStore(){
    const middlewares = [thunk, createLogger()];
    return createStore(rootReducer,applyMiddleware(...middlewares))
}

export const store = configureStore();

console.log(store.getState());

export const getAllCardsAsArray = (state)=>{
    return cardSelectors.getAllCardsAsArray(state.cards);
};

export const getHistoryListAsArray = (state)=>{
    return historyListSelectors.getHistoryListAsArray(state.historyList);
};