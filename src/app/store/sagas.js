import {take, put, select} from 'redux-saga/effects';
import * as mutations from './mutations'
import uuid from 'react-uuid';
import axios from 'axios'

const url= process.env.NODE_ENV == 'production' ? '' : "http://localhost:7777"

export function* taskCreationSaga(){
    while(true) {
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID='U1';
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupID, ownerID));
        const { res} = yield axios.post(url + `/task/new`, {
            task: {
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "New Task"
            }
        });
        console.info("Got reponse ", res)
    }
}

export function* taskModificationSaga(){
    while(true) {
        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        axios.post(url + `/task/update`, {
            task: {
                id: task.taskID,
                group: task.groupID,
                isComplete: task.isComplete,
                name: task.name
            }
        })
    }
}