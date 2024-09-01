import React, { useEffect, useState } from 'react';
import styles from './Tasks.module.css';
import { useAuth } from '../context/AuthContext';
import Task from './Task';
import { useTasks } from '../context/TaskContext';

const Tasks = () => {
    const { auth } = useAuth();
    const { taskList, fetchTasks } = useTasks();

    useEffect(() => {
        if (auth) {
            fetchTasks();
        }
    }, [])

    return (
        <>
        <div className={styles.tasksBox}>
            <h1>Tasks</h1>
            <div className={styles.tasksList}>
                {(taskList) ? 
                    taskList.map((task) => {
                        return <Task key={task._id} _id={task._id} description={task.description} xpValue={task.xp_value} />
                    }) 
                    :
                    <p>No tasks today...</p>}
            </div>
        </div>
        </>
    )
}

export default Tasks