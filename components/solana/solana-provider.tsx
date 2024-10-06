'use client'

import dynamic from 'next/dynamic'
import axios from 'axios'

import type { WalletError } from '@solana/wallet-adapter-base'
import {
    ConnectionProvider,
    WalletProvider,
    useConnection,
} from '@solana/wallet-adapter-react'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    MathWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useCluster } from '../cluster/cluster-data-access'

import './styles.css'

require('@solana/wallet-adapter-react-ui/styles.css')

export const WalletButton = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
)

export function SolanaProvider({ children }: { children: ReactNode }) {
    // const [publicAddress, setPublicAddress] = useState('')
    // const [isRegistered, setIsRegistered] = useState<boolean>()
    // console.log('isRegistered', isRegistered)
    // const { connection } = useConnection()
    const { cluster } = useCluster()
    const endpoint = useMemo(() => cluster.endpoint, [cluster])
    const onError = useCallback((error: WalletError) => {
        console.error(error)
    }, [])

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new PhantomWalletAdapter(),
            new MathWalletAdapter(),
        ],
        []
    )

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider
                wallets={wallets}
                onError={onError}
                autoConnect={true}
            >
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
