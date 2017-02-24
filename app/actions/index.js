/**
 * Created by dionid on 20.02.17.
 */
import {apiGetCards} from "../api/fetchCards";
import {apiGetHistoryList} from "../api/fetchHistoryList";
import {FETCH_CARD_LIST_REQUEST} from "../constants/actions";
import {FETCH_CARD_LIST_SUCCESS} from "../constants/actions";
import {FETCH_HISTORY_LIST_REQUEST} from "../constants/actions";
import {FETCH_HISTORY_LIST_SUCCESS} from "../constants/actions";
import {REQUEST_HISTORY_LIST} from "../constants/actions";
import {REQUEST_CARD_LIST} from "../constants/actions";


export const requestCardsAC = ()=>({
    type: REQUEST_CARD_LIST
});

export const requestCards = ()=> (dispatch)=>{
    dispatch({
        type: FETCH_CARD_LIST_REQUEST
    });

    apiGetCards().then(data=>{
        let response = data.reduce((obj,card)=>{
            obj[card.id]=card;
            return obj;
        },{});

        dispatch({
            type: FETCH_CARD_LIST_SUCCESS,
            response
        })
    })
};

export const requestHistoryListAC = ()=>({
    type: REQUEST_HISTORY_LIST
});

export const requestHistoryList = ()=> (dispatch)=>{
    dispatch({
        type: FETCH_HISTORY_LIST_REQUEST
    });

    apiGetHistoryList().then(data=>{
        let response = data.reduce((obj,card)=>{
            obj[card.id]=card;
            return obj;
        },{});

        dispatch({
            type: FETCH_HISTORY_LIST_SUCCESS,
            response
        })
    })
};