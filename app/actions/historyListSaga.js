import {REQUEST_HISTORY_LIST} from "../constants/actions";
import {takeLatest, takeEvery, call, put} from "redux-saga/effects";
import {apiGetHistoryList} from "../api/fetchHistoryList";
import {FETCH_HISTORY_LIST_SUCCESS} from "../constants/actions";
import {apiGetCards} from "../api/fetchCards";
import normalizeResponse from "../utils/normilazeResponse";
import {REQUEST_CARD_LIST} from "../constants/actions";
import {FETCH_CARD_LIST_SUCCESS} from "../constants/actions";
/**
 * Created by dionid on 23.02.17.
 */


function* fetchHistoryList(action){
    try{
        const data = yield call(apiGetHistoryList);

        const response = normalizeResponse(data);
        
        yield put({
            type: FETCH_HISTORY_LIST_SUCCESS,
            response
        })
    } catch (e){
        console.warn('!!! ',e);
    }
}

function* fetchCards(action){
    try{
        const data = yield call(apiGetCards);

        const response = normalizeResponse(data);
        
        yield put({
            type: FETCH_CARD_LIST_SUCCESS,
            response
        })
    } catch (e){
        console.warn('!!! ',e);
    }
}

export default function* mySaga(){
    // console.log(takeLatest);
    yield [
        takeLatest(REQUEST_HISTORY_LIST,fetchHistoryList),
        takeEvery(REQUEST_CARD_LIST,fetchCards)
    ];
}