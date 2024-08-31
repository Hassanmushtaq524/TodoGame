import React, { useEffect, useState } from 'react';
import './Tasks.css';
import { useAuth } from '../context/AuthContext';
import Task from './Task';
import { useTasks } from '../context/TaskContext';

const Tasks = () => {
    const { auth } = useAuth();
    const { taskList, fetchTasks } = useTasks();

    useEffect(() => {
        if (auth) {
            fetchTasks();
            console.log(taskList);
        }
    }, [])

    return (
        <>
        <div id="daily-tasks">
            <h1>Daily Tasks</h1>
            <div className="task-list">
                {(taskList) ? 
                    taskList.map((task) => {
                        return <Task key={task._id} _id={task._id} description={task.description} xpValue={task.xpValue} completed={task.completed}/>
                    }) 
                    :
                    <p>No tasks today...</p>}
            </div>
        </div>
        </>
    )
}

export default Tasks