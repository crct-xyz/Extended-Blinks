'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

type ProviderContext = {
    isRegistered: boolean
    setIsRegistered: (isRegistered: boolean) => void
}

const Context = createContext<ProviderContext>({
    isRegistered: false,
    setIsRegistered: () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
    const [isRegistered, setIsRegistered] = useState<boolean>(true)
    return (
        <Context.Provider value={[isRegistered, setIsRegistered]}>
            {children}
        </Context.Provider>
    )
}

export function useUserContext() {
    return useContext(Context)
}
