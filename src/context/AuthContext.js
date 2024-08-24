import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});

    // TODO: Remove the default values
    const _defaultUser = {
        _id: 1,
        username: "HSSN",
        email: "hhmushtaq@owu.edu",
        imgUrl: "https://avatars.githubusercontent.com/u/62754980?s=400&u=e3421ca276580ee4d4651b0034747212359c2948&v=4",
        level: 40,
        totalXp: 500
    }
    

    // TODO: Review 
    useEffect(() => {
        setUser(_defaultUser)
        setAuth(true)
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