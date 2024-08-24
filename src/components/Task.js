import React from 'react';
import './Task.css';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

const Task = (props) => {
    const { _id, description, xpValue, completed } = props;
    const { updateTask } = useTasks();
    const { user } = useAuth();

    const checkClicked = () => {
        console.log("clicked");
        updateTask({ 
            _id: _id,
            description: description,
            xpValue: xpValue, 
            createdBy: user._id,
            completed: true
        })
    }

    return (
        <>
        <div id="task">
            <input type="checkbox" checked={completed} onClick={() => {checkClicked()}}/>
            <h3>{description}</h3>
            <h3>{xpValue}</h3>
        </div>
        </>
    )
}

export default Task;