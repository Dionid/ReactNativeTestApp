/**
 * Created by dionid on 20.02.17.
 */

import axios from "axios";
import {ROOT_API} from "../config/api";

export const apiGetCards = ()=>{
    return axios.get(ROOT_API+'/cards').then(({data})=>{
        return data;
    }).catch(err=>{
        console.log(err);
    })
    
};