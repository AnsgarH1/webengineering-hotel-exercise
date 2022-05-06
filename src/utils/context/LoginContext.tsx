import React, { useState, useContext } from "react"
import { UserType } from "../types"

interface LoginContextProps {
    user: UserType | null,
    login: () => void,
    logout: () => void
}

const initialContextValues: LoginContextProps = {
    user: null,
    login: () => { },
    logout: () => { }
}

export const LoginContext = React.createContext<LoginContextProps>(initialContextValues)

export const useLoginContext = () => useContext(LoginContext)

export function LoginContextProvider({ children }: { children: React.ReactChild | React.ReactChild[] }) {

    const [user, setUser] = useState<UserType | null>(null)

    const login = () => setUser({ id: "1579ffa9-4e7e-4a12-bd46-9dc9c1750951", firstName: "Max", lastName: "Mustermann", })

    const logout = () => setUser(null)

    return (
        <LoginContext.Provider value={{ user, login, logout }}>{children}</LoginContext.Provider>
    )

}
