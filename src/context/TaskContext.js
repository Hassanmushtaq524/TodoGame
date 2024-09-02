import { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const TaskContext = createContext(null);



export default function TaskProvider({children}) {
    const [taskList, setTaskList] = useState([]);

    /**
     * Fetches the tasks for the current authenticated user
     * 
     * @returns true if successful, false otherwise
     */
    const fetchTasks = async () => {
        const url = process.env.REACT_APP_API_URL + '/api/tasks/';
        try {
            /**
             * Get the data from backend and update task list
             */
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            })

            if (!response.ok) { 
                setTaskList([]);
                return false;
            }

            const data = await response.json();
            setTaskList(data.data);
            return true;
        } catch (error) {
            setTaskList([]);
            return false;
        }
    }


    /**
     * Adds a new task to the task list
     * 
     * @param {Object} newTask The task to add 
     * @returns true if successful, false otherwise
     */
    const addTask = async (newTask) => {
        const url = process.env.REACT_APP_API_URL + '/api/tasks/';
        try {
            /**
             * Add the task and fetch it again
             */
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify(newTask)
            })

            if (!response.ok) { 
                return false;
            }

            const success = await fetchTasks();
            if (!success) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 
     * @param {Object} taskInfo The task info we are changing
     * @param {Number} id The id of the task we are changing
     * @returns true if successful, false otherwise
     */
    const updateTask = async (taskInfo, id) => {
        const url = process.env.REACT_APP_API_URL + `/api/tasks/${id}`;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify(taskInfo)
            })

            if (!response.ok) {
                return false;
            }

            const success = await fetchTasks();
            if (!success) {
                return false;
            }

            return true;
        } catch (error) {   
            return false;
        }
    }

    return (
        <TaskContext.Provider value={ { taskList, fetchTasks, addTask, updateTask }}>
            { children }
        </TaskContext.Provider>
    )
}

// useAuth custom hook to return the context
export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("TaskContext cannot be a null value");
    } else {
        return context;
    }
}