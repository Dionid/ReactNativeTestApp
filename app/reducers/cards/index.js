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

const byId = (state=initialState,action) =>{
    switch(action.type){
        case 'REQUEST_CARD_LIST_SUCCESS':
            return Object.assign({},state,action.response);
        default:
            return state;
    }
};

export default combineReducers({
    byId
});

export const getAllCardsAsArray = (state)=>{
    return Object.keys(state.byId).map(cardId => state.byId[cardId] );
};

