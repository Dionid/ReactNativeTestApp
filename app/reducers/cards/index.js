/**
 * Created by dionid on 20.02.17.
 */

import {combineReducers} from "redux";

const initialState = {
    0:{
        id: 0,
        sum: 1000
    },
    1:{
        id: 1,
        sum: 2000
    },
    2:{
        id: 2,
        sum: 3000
    },
    3:{
        id: 3,
        sum: 4000
    },
    4:{
        id: 4,
        sum: 5000
    },
    5:{
        id: 5,
        sum: 6000
    },
    6:{
        id: 6,
        sum: 7000
    }
};

const byId = (state={},action) =>{
    switch(action.type){
        case 'FETCH_CARD_LIST_SUCCESS':
            return Object.assign({},state,action.response);
        default:
            return state;
    }
};

const isFetching = (state=false,action) =>{
    switch(action.type){
        case 'FETCH_CARD_LIST_SUCCESS':
            return false;
        case 'FETCH_CARD_LIST_REQUEST':
            return true;
        default:
            return state;
    }
};

const cardsNumber = (state=0,action) =>{
    switch(action.type){
        case 'FETCH_CARD_LIST_SUCCESS':
            return Object.keys(action.response).length;
        default:
            return state;
    }
};

export default combineReducers({
    byId,
    cardsNumber,
    isFetching
});

export const getAllCardsAsArray = (state)=>{
    return Object.keys(state.byId).map(cardId => state.byId[cardId] );
};

export const getCardsNumber = (state)=>{
    return state.cardsNumber;
};

export const cardsIsFetching = (state)=>{
    return state.isFetching;
};