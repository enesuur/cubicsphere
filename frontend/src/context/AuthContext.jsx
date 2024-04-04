import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function retrieveUser(){
            try {
                const response = await fetch("http://127.0.0.1:5000/retrieve-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                if(response.status === 400 || response.status === 401 || response.status === 404  ){
                    setUser(null);
                }else{
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error while retrieving user data:", error.message);
                setUser(null);
            }
        };
        retrieveUser();
    }, []);
    
    return (
        <AuthContext.Provider 
        value={{ 
            user, 
            setUser,
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
