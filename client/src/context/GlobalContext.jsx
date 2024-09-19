/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const initialContext = {
    isLoggedIn: false,
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);

    function changeLogginStatus(newStatus = false) {
        setIsLoggedIn(newStatus);
    }

    return (
        <GlobalContext.Provider value={{ isLoggedIn, changeLogginStatus }}>
            {props.children}
        </GlobalContext.Provider>
    );
}