/**
 * Created by dionid on 20.02.17.
 */

import axios from "axios";
import {ROOT_API} from "../config/api";

export const apiGetHistoryList = ()=>{
    return axios.get(ROOT_API+'/historyList').then(({data})=>{
        return data;
    }).catch(err=>{
        console.log(err);
    })
    
};