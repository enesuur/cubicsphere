import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuthConfirmed, setIsAuthConfirmed] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                isAuthConfirmed,
                setIsAuthConfirmed
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
