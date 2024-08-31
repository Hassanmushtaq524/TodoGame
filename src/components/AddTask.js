import React, { useRef, useState } from 'react'
import styles from './AddTask.module.css';
import { useTasks } from '../context/TaskContext';


function AddTask() {
    const taskRef = useRef();
    const [error, setError] = useState(false);
    const { addTask } = useTasks();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!taskRef.current.description.value || !taskRef.current.xpValue.value) {
            setError(true);
        }
        const newTask = {
            description: taskRef.current.description.value,
            xpValue: taskRef.current.xpValue.value
        }

        const success = addTask(newTask);
        if (!success) {
            setError(true);
        } else {
            setError(false);
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
            { error && <p style={{color: 'red'}}>Incorrect Task</p>}
            <button className="primary-button"><b>Add Task</b></button>
        </form>
        </>
    )
}

export default AddTask;