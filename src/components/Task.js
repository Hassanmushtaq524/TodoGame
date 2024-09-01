import React, { useEffect, useState } from 'react';
import styles from './Task.module.css';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const Task = (props) => {
    /**
     * Get props and correct contexts needed
     */
    const { _id, description, xpValue } = props;
    const [alertState, setAlertState] = useState(false);
    const { updateUserLevel } = useAuth();
    const { updateTask } = useTasks();
    const [error, setError] = useState(false);


    useEffect(() => {
        setError(false);
    }, [])


    const handleConfirm = async () => {
        /**
         * Update the level
         */
        let success = await updateUserLevel(xpValue);
        if (!success) {
            setError(true);
        } 

        /**
         * Now set the task to true
         */
        success = await updateTask({ completed: true }, _id);
        if (!success) {
            setError(true);
        }
    }

    const handleClicked = async (e) => {
        // TODO; implement
        // We need to show an alert
        // If yes, then update user xp by PATCH /api/users/ body: {xpGained}
        // We then update the task to completed by PATCH /api/tasks/:id
        e.preventDefault();


        
    }

    return (
        <>
        <div className={styles.taskBox} >
            <input type="checkbox" name="cb" id="checkbox" onChange={handleClicked} />
            <label htmlFor="checkbox" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <h3>{description}</h3>
                <p>{xpValue}</p>
            </label>
            { error && <p style={{ color: 'red'}}>Some error occurred</p>}
        </div>
        </>
    )
}

export default Task;