import React, { useEffect, useState } from 'react';
import './Tasks.css';
import { useAuth } from '../context/AuthContext';
import Task from './Task';
import { useTasks } from '../context/TaskContext';

const Tasks = () => {
    const { user, auth } = useAuth();
    const { taskList } = useTasks();

    useEffect(() => {
    }, [])

    return (
        <>
        <div id="daily-tasks">
            <h1>Daily Tasks</h1>
            <div className="task-list">
                {taskList.map((task) => {
                    return <Task key={task._id} _id={task._id} description={task.description} xpValue={task.xpValue} completed={task.completed}/>
                })}
            </div>
        </div>
        </>
    )
}

export default Tasks