import React from 'react';
import './Task.css';


const Task = (props) => {
    const { description, xpValue, completed } = props;

    const checkClicked = () => {
        console.log("clicked");
    }

    return (
        <>
        <div id="task">
            <input type="checkbox" onClick={() => {checkClicked()}}/>
            <h3>{description}</h3>
            <h3>{xpValue}</h3>
        </div>
        </>
    )
}

export default Task;