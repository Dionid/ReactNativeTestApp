import {REQUEST_HISTORY_LIST} from "../constants/actions";
import {takeLatest, call, put} from "redux-saga/effects";
import {apiGetHistoryList} from "../api/fetchHistoryList";
import {FETCH_HISTORY_LIST_SUCCESS} from "../constants/actions";
/**
 * Created by dionid on 23.02.17.
 */

function* fetchHistoryList(action){
    try{
        const data = yield call(apiGetHistoryList);

        const response = data.reduce((obj,card)=>{
            obj[card.id]=card;
            return obj;
        },{});
        
        yield put({
            type: FETCH_HISTORY_LIST_SUCCESS,
            response
        })
    } catch (e){
        console.warn('!!! ',e);
    }
}

export default function* mySaga(){
    // console.log(takeLatest);
    yield takeLatest(REQUEST_HISTORY_LIST,fetchHistoryList)
}