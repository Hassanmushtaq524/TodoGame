import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});


    /**
     * Make the state persist after refresh
     */
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAuth(true);
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setAuth(false);
            setUser({});
        }
    }, [])

    
    const signupUser = (userInfo) => {
        // TODO: implement
        // We send the info (email, username, password) to /api/users/signup
    }



    /**
     * Logs in the user
     * 
     * @param {Object} userInfo Contains username, password 
     * @returns true if successful, false otherwise
     */
    const loginUser = async (userInfo) => {
        const url = process.env.REACT_APP_API_URL + "/api/users/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userInfo)
            });
    
            /**
             * Get the response and save user, auth status, and auth token
             */
            if (!response.ok) {
                setUser({});
                setAuth(false);
                return false;
            }
            
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            setAuth(true);

            return true;
        } catch (error) {
            setAuth(false);
            setUser({});
            return false;
        }
    }



    const updateUserLevel = (xpGained) => {
        // TODO: implement
        // We send a PATCH request to /api/users/ with (xpGained)
    }

    return (
        <AuthContext.Provider value={ { user, auth, loginUser, signupUser, updateUserLevel }}>
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