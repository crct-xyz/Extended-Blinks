'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'
import { SquintContext } from './contracts'

const Context = createContext<SquintContext | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
    const [isRegistered, setIsRegistered] = useState<boolean>(true)
    const [isOrderSuccessfull, setIsOrderSuccessfull] = useState<boolean>(false)
    return (
        <Context.Provider
            value={{
                isRegistered,
                setIsRegistered,
                isOrderSuccessfull,
                setIsOrderSuccessfull,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export function useUserContext() {
    return useContext(Context)
}
