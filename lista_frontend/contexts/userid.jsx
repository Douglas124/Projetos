import { createContext,useEffect, useState } from "react";

export const UserContext = createContext([]);

export default function UserProvider({children}){
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const {nome,id,email} = JSON.parse(localStorage.getItem("user"));
           
            setUser({nome,id,email});
        }
    },[]);

    return (
    <UserContext.Provider 
    value = {{
        user,
        setUser
    }}
    >
        
        {children}
    </UserContext.Provider>
    );
}