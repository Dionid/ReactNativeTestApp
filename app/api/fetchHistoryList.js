/**
 * Created by dionid on 20.02.17.
 */

import axios from "axios";

export const apiGetHistoryList = ()=>{
    return axios.get('http://localhost:3000/historyList').then(({data})=>{
        return data;
    }).catch(err=>{
        console.log(err);
    })
    
};