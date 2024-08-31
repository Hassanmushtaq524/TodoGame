import { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const TaskContext = createContext(null);



export default function TaskProvider({children}) {
    const [taskList, setTaskList] = useState([]);

    // TODO: Review 
    useEffect(() => {
        if (localStorage.getItem("user")) {
            fetchTasks()
        }
    }, [])

    const fetchTasks = () => {
        // TODO: implement
    }

    const updateTask = (changedTask) => {
        // TODO: implement
    }


    return (
        <TaskContext.Provider value={ { taskList }}>
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