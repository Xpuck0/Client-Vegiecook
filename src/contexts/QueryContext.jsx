
import { useState, useContext, createContext} from "react";

export const QueryContext = createContext();

export default function QueryContextProvider({children}) {
    const [query, setQuery] = useState('');

    const reset = () => {
        setQuery('')
    }

    const update = (str) => {
        setQuery(str);
    }

    const values = {
        query,
        setQuery,
        reset,
        update,
    };

    return (
        <QueryContext.Provider value={values}>
            {children}
        </QueryContext.Provider>
    )
}