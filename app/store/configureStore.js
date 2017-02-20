/**
 * Created by dionid on 20.02.17.
 */

import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {rootReducer} from "../reducers/index";

function configureStore(){
    const middlewares = [thunk, createLogger()];
    return createStore(rootReducer,applyMiddleware(...middlewares))
}

export const store = configureStore();