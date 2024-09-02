import React, { useEffect, useState } from 'react';
import styles from './Task.module.css';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Task = (props) => {
    /**
     * Get props and correct contexts needed
     */
    const { _id, description, xpValue } = props;
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
        // We need to show an alert
        // If yes, then update user xp by PATCH /api/users/ body: {xpGained}
        // We then update the task to completed by PATCH /api/tasks/:id
        e.preventDefault();

        confirmAlert({
            title: 'Please Confirm',
            message: 'Verify you completed this task',
            buttons: [
            {
                label: 'Yes',
                onClick: async () => {
                    await handleConfirm();
                }
            },
            {
                label: 'No',
                onClick: () => {
                    return;
                }
            }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true
        });
        
    }

    return (
        <>
        <div className={styles.taskBox} >
            <h5 className={styles.completedBox} onClick={handleClicked}>Mark Completed</h5>
            <h3>{description}</h3>
            <p>{xpValue} <b>XP</b></p>
            { error && <p style={{ color: 'red'}}>Some error occurred</p>}
        </div>
        </>
    )
}

export default Task;