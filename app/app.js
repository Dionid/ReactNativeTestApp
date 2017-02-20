/**
 * Created by dionid on 17.02.17.
 */

import React from 'react';
import {Provider} from "react-redux";
import MainLayout from "./layouts/MainLayout";
import {store} from "./store/configureStore";


export default function RocketTestApp(){
    return (
        <Provider store={store}>
            <MainLayout/>
        </Provider>
    )
}