import { useState, useEffect } from "react";
import { createContext } from "react";
import usePersistedState from "../CustomHooks/usePersistedState";


const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [auth, setAuth] = usePersistedState('auth', {})

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify({...auth}))
    }, [auth])


    const values = {
        userId: auth.id,
        username: auth.username,
        setAuth: setAuth,
        isAuthenticated: !!auth.id
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;