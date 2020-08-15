import { createStore, applyMiddleware } from 'redux';
import {defaultState} from '../../server/defaultState';
import {logger} from 'redux-logger'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas.mock'
import * as mutations from './mutations'
import { combineReducers } from 'redux';

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    combineReducers({
        tasks(tasks = defaultState.tasks, action) {
            switch(action.type) {
                case mutations.CREATE_TASK:
                    return [...tasks,{
                        id:action.taskID,
                        name:"New Task",
                        group:action.groupID,
                        owner:action.ownerID,
                        isComplete:false
                    }]
            }
            return tasks;
        }, 
        comments(comments=defaultState.comments){
            return comments
        },
        groups(groups=defaultState.groups){
            return groups
        },
        users(users=defaultState.users){
            return users
        },

    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas){
    
    sagaMiddleware.run(sagas[saga])
}