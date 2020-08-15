import { createStore, applyMiddleware } from 'redux';
import {defaultState} from '../../server/defaultState';
import {logger} from 'redux-logger'
export const store = createStore(
    function reducer(state = defaultState,action){
        return state
    },
    applyMiddleware(logger)
)