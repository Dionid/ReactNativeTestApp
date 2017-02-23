/**
 * Created by dionid on 20.02.17.
 */

import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {rootReducer} from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import mySaga from "../actions/historyListSaga";

function configureStore(){

    const sagaMiddleware = createSagaMiddleware();
    
    const middlewares = [thunk, createLogger(),sagaMiddleware];
    const store = createStore(rootReducer,applyMiddleware(...middlewares));

    sagaMiddleware.run(mySaga);
    
    return store;
}

export const store = configureStore();