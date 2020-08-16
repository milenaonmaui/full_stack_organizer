import React from 'react';
import { connect } from 'react-redux'
import { requestTaskCreation } from '../store/mutations'
import {Link} from 'react-router-dom'

export const TaskList = ({tasks, name, id, createNewTask}) => (
    <div className = "card p-2 m-2">
    <h3>{name}</h3>
        <div>
            {tasks.map(task => (<Link to={`/tasks/${task.id}`} key={task.id}><div className="card p-2 m-2"> 
                {task.name}
            </div></Link>))}
        </div>
        <button onClick={() => createNewTask(id)} className="btn btn-primary btn-block mt-2">Add New</button>
    </div>
)

function mapStateToProps(state, ownProps) {
    
    let groupID = ownProps.id;
    
    return {
        name: ownProps.name,
        id: groupID,
        tasks: state.tasks.filter(task => task.group === groupID)
    }
}


const mapDispatchToProps = (dispatch, {id})=>({
    createNewTask(){
        console.log("Creating new task...", id)
        console.log(dispatch(requestTaskCreation(id)));
    }
});

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);