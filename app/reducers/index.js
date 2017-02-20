/**
 * Created by dionid on 20.02.17.
 */


import {combineReducers} from "redux";
import cards, * as cardSelectors from "./cards";
import historyList, * as historyListSelectors from "./historyList";

export const rootReducer = combineReducers({
    cards,
    historyList
});

export const getAllCardsAsArray = (state)=>{
    return cardSelectors.getAllCardsAsArray(state.cards);
};

export const getHistoryListAsArray = (state)=>{
    return historyListSelectors.getHistoryListAsArray(state.historyList);
};

export const getCardsNumber = (state)=>{
    return cardSelectors.getCardsNumber(state.cards);
};