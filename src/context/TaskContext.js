import { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const TaskContext = createContext(null);



// TODO: remove emulating functions
const _fetchTasks = () => {
    return [
        { _id: 1, description: "Task number 1", xpValue: 50, createdBy: 1, completed: false },
        { _id: 2, description: "Task number 2", xpValue: 51, createdBy: 1, completed: false },
        { _id: 3, description: "Task number 3", xpValue: 52, createdBy: 1, completed: false },
        { _id: 4, description: "Task number 4", xpValue: 53, createdBy: 1, completed: false }
    ];
}

const _updateTask = (changedTask, setTaskList, taskList) => {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i]._id = changedTask._id) {
            setTaskList([...taskList.slice(0, i), changedTask, ...taskList.slice(i + 1)]);
            break;
        }

    }
    console.log(taskList)
}

const _addTask = (newTask, setTaskList, taskList) => {
    setTaskList([...taskList, newTask]);
}


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
        setTaskList(_fetchTasks());
    }

    const updateTask = (changedTask) => {
        // TODO: implement
        _updateTask(changedTask, setTaskList, taskList);
    }


    return (
        <TaskContext.Provider value={ { taskList, fetchTasks, updateTask }}>
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