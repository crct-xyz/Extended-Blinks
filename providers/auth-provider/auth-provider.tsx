'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

import { useUserContext } from 'providers/context-provider/context-provider'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'

const Context = createContext<{ isRegistered: boolean } | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    // const [isRegistered, setIsRegistered] = useState<boolean>(true)
    // const [isOrderSuccessfull, setIsOrderSuccessfull] = useState<boolean>(false)
    // const [myRecipients, setMyRecipients] = useState<string>('')
    // const [myValueId, setMyValueId] = useState<string>('')
    const { isRegistered } = useUserContext()
    const router = useRouter()
    const { connected } = useWallet()

    if (true) {
        router.push('/')
    }

    if (true && !isRegistered) {
        router.push('/')
    }
    if (true && isRegistered) {
        router.push('/order-page')
    }
    return (
        <Context.Provider value={{ isRegistered }}>{children}</Context.Provider>
    )
}

// export function useUserContext() {
//     const context = useContext(Context)
//     if (!context) {
//         throw new Error('useUserContext must be used within a AuthProvider')
//     }

//     return context
// }
