/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    isLoggedIn: false,
    role: 'public',
    changeLoginStatus: () => { },
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);
    const [role, setRole] = useState(initialContext.role);

    useEffect(() => {
        fetch('http://localhost:5020/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(data.isLoggedIn);
                setRole(data.role);
            })
            .catch(e => console.error(e));
    }, []);

    function changeLoginStatus(newStatus = initialContext.isLoggedIn) {
        setIsLoggedIn(newStatus);
    }

    function changeRole(newRole = initialContext.role) {
        setRole(newRole);
    }

    const values = {
        isLoggedIn,
        changeLoginStatus,
        role,
        changeRole,
    };

    return (
        <GlobalContext.Provider value={values}>
            {props.children}
        </GlobalContext.Provider>
    );
}