import { createContext, useContext, useState } from "react";

const LoginVisible = createContext();
const SigninVisible = createContext();

export function useAuthVisible() {
    return useContext(LoginVisible);
}

export default function LoginVisibleProvider ({ children }) {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false)
    const [isLoginVisible, setIsLoginVisible] = useState(false)

    const toggleLoginVisible = (visible) => visible ? setIsLoginVisible(visible) : setIsLoginVisible(!isLoginVisible);
    const toggleRegisterVisible = (visible) => visible ? setIsRegisterVisible(visible) : setIsRegisterVisible(!isRegisterVisible);
    const toggleBoth = () => {
        toggleLoginVisible();
        toggleRegisterVisible();
    }

    return (
        <LoginVisible.Provider value={{isLoginVisible, toggleLoginVisible, isRegisterVisible, toggleRegisterVisible, toggleBoth}}>
            {children}
        </LoginVisible.Provider>
    )
}