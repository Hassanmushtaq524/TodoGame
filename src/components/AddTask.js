import React, { useRef, useState } from 'react'
import styles from './AddTask.module.css';
import { useTasks } from '../context/TaskContext';


function AddTask() {
    const taskRef = useRef();
    const [error, setError] = useState(false);
    const { addTask } = useTasks();


    /**
     * Add the task and set errors if needed
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!taskRef.current.description.value || !taskRef.current.xpValue.value) {
            setError(true);
            return;
        }

        if (taskRef.current.xpValue.value < 0) {
            setError(true);
            return;
        }

        const newTask = {
            description: taskRef.current.description.value,
            xpValue: Math.round(taskRef.current.xpValue.value)
        }

        const success = await addTask(newTask);
        if (!success) {
            setError(true);
        } else {
            setError(false);
            taskRef.current.description.value = '';
            taskRef.current.xpValue.value = '';
        }
    }

    return (
        <>
        <form ref={taskRef} className={styles.addtaskForm} onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input type="text" name="description" placeholder="Enter Description"/>
            </div>
            <div>
                <label>XP Value</label>
                <input type="text" name="xpValue" placeholder="Enter XP Value"/>
            </div>
            { error && <p style={{color: 'red'}}>Invalid Task</p>}
            <button className="primary-button"><b>Add Task</b></button>
        </form>
        </>
    )
}

export default AddTask;