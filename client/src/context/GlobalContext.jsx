/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    isLoggedIn: false,
    role: 'public',
    username: '',
    changeLoginStatus: () => { },
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);

    useEffect(() => {
        fetch('http://localhost:5020/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(data.isLoggedIn);
                setRole(data.role);
                setUsername(data.username);
            })
            .catch(e => console.error(e));
    }, []);

    function changeLoginStatus(newStatus = initialContext.isLoggedIn) {
        setIsLoggedIn(newStatus);
    }

    function changeRole(newRole = initialContext.role) {
        setRole(newRole);
    }

    function changeUsername(newUsername = initialContext.username) {
        setUsername(newUsername);
    }

    const values = {
        isLoggedIn,
        changeLoginStatus,
        role,
        changeRole,
        username,
        changeUsername,
    };

    return (
        <GlobalContext.Provider value={values}>
            {props.children}
        </GlobalContext.Provider>
    );
}