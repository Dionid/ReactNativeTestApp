/**
 * Created by dionid on 20.02.17.
 */


import {applyMiddleware, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import cards, * as cardSelectors from "./cards";

const rootReducer = combineReducers({
    cards
});

function configureStore(){
    const middlewares = [thunk, createLogger()];
    return createStore(rootReducer,applyMiddleware(...middlewares))
};

export const store = configureStore();

console.log(store.getState());

export const getAllCardsAsArray = (state)=>{
    return cardSelectors.getAllCardsAsArray(state.cards);
};