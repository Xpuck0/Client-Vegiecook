import { createContext, createRef, useContext, useRef } from 'react';

const ScrollContext = createContext();

export function useScroll() {
    return useContext(ScrollContext);
}

export function ScrollProvider({ children }) {
    const recipesSectionRef = createRef();

    return (
        <ScrollContext.Provider value={{ recipesSectionRef }}>
            {children}
        </ScrollContext.Provider>
    );
}