/**
 * Created by dionid on 20.02.17.
 */

import {combineReducers} from "redux";
import {FETCH_HISTORY_LIST_SUCCESS} from "../../constants/actions";
import {FETCH_HISTORY_LIST_REQUEST} from "../../constants/actions";

const initialState = {
    0: {
        id:0,
        name: 'Сегодня',
        totalSum: 5000,
        transactions: [
            {
                id:0,
                bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                name: 'Billa',
                sum: 1200,
                additional: '#Text'
            },
            {
                id:1,
                bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                name: 'Billa',
                sum: 1200,
                additional: '#Text'
            },{
                id:2,
                bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                name: 'Billa',
                sum: 1200,
                additional: '#Text'
            }
        ]
    },
    1:{
        id:1,
            name: 'Вчера',
        totalSum: 5000,
        transactions: [
            {
                id:0,
                bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                name: 'Billa',
                sum: 1200,
                additional: '#Text'
            },
            {
                id:1,
                bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                name: 'Billa',
                sum: 1200,
                additional: '#Text'
            },{
                id:2,
                bgImageUri: 'https://www.billa.at/WNBinaryWeb/120/4514406.png',
                name: 'Billa',
                sum: 1200,
                additional: '#Text'
            }
        ]   
    }
};

const byId = (state={},action) =>{
    switch(action.type){
        case FETCH_HISTORY_LIST_SUCCESS:
            return Object.assign({},state,action.response);
        default:
            return state;
    }
};

const isFetching = (state=false,action) =>{
    switch(action.type){
        case FETCH_HISTORY_LIST_SUCCESS:
            return false;
        case FETCH_HISTORY_LIST_REQUEST:
            return true;
        default:
            return state;
    }
};

export default combineReducers({
    byId,
    isFetching
});

export const getHistoryListAsArray = (state)=>{
    return Object.keys(state.byId).map(dayId => state.byId[dayId] );
};

export const historyListIsFetching = (state)=>{
    return state.isFetching;
};