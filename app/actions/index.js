/**
 * Created by dionid on 20.02.17.
 */
import {apiGetCards} from "../api/fetchCards";

export const requestCards = ()=> (dispatch)=>{
    dispatch({
        type: 'FETCH_CARD_LIST_REQUEST'
    });

    apiGetCards().then(data=>{
        let response = data.reduce((obj,card)=>{
            obj[card.id]=card;
            return obj;
        },{});

        dispatch({
            type: 'FETCH_CARD_LIST_SUCCESS',
            response
        })
    })
};