import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuthConfirmed, setIsAuthConfirmed] = useState(false);

    useEffect(() => {
        async function retrieveUser(){
            try {
                const response = await fetch("http://127.0.0.1:5000/user/retrieve-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                console.log(data)
                if(data.message === "User not found."){
                    setIsAuthConfirmed(false);
                }else{
                    setIsAuthConfirmed(true);
                }
               
            } catch (error) {
                console.error("Error while retrieving user data:", error.message);
                setIsAuthConfirmed(false);
            }
        };
        retrieveUser();
    }, []);

    return (
        <AuthContext.Provider 
        value={{ 
            isAuthConfirmed, 
            setIsAuthConfirmed,
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
