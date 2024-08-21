import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});

    // TODO: Remove the default values
    __defaultUser = {
        _id: 1,
        username: "HSSN",
        email: "hhmushtaq@owu.edu",
        level: 40,
        completedTasks: [ { _id: 1, name: "Task 1", description: "Complete this task 1", xpValue: 550, createdBy: 1 } ]
    }
    
    // TODO: remove
    setUser(__defaultUser)
    setAuth(true)


    // Restore user
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAuth(true);
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setAuth(false);
            setUser({});
        }
    }, [])

    return (
        <AuthContext.Provider value={ { user, auth }}>
            { children }
        </AuthContext.Provider>
    )
}

// useAuth custom hook to return the context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext cannot be a null value");
    } else {
        return context;
    }
}