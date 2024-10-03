'use client'

import dynamic from 'next/dynamic'
import axios, { isCancel, AxiosError } from 'axios'

import type { WalletError } from '@solana/wallet-adapter-base'
import {
    ConnectionProvider,
    useWallet,
    WalletProvider,
} from '@solana/wallet-adapter-react'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    MathWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import {
    WalletModalProvider,
    useWalletModal,
} from '@solana/wallet-adapter-react-ui'
import {
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCluster } from '../cluster/cluster-data-access'

import { Connection, PublicKey } from '@solana/web3.js'
import './styles.css'

require('@solana/wallet-adapter-react-ui/styles.css')

export const WalletButton = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
)

export function SolanaProvider({ children }: { children: ReactNode }) {
    const [publicAddress, setPublicAddress] = useState('')
    const { wallet } = useWallet()
    console.log('wallet', wallet)
    const { cluster } = useCluster()
    const endpoint = useMemo(() => cluster.endpoint, [cluster])
    const onError = useCallback((error: WalletError) => {
        console.error(error)
    }, [])

    useEffect(() => {
        if (publicAddress) {
            axios
                .post(
                    'http://ec2-52-59-228-70.eu-central-1.compute.amazonaws.com:8000/users/',
                    {
                        user_id: uuidv4(),
                        wallet_name: 'solana',
                        wallet_public_key: publicAddress,
                    }
                )
                .then(function (response) {
                    console.log('exito')
                    console.log(response)
                })
                .catch(function (error) {
                    console.log('error')
                    console.log(error)
                })
        }
        // console.log('publicAddress', publicAddress)
    }, [publicAddress])

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new PhantomWalletAdapter(),
            new MathWalletAdapter(),
        ],
        []
    )

    const getWalletPublicKey = async () => {
        // Check if Solana is available in the browser
        if ('solana' in window) {
            const provider = window.solana

            try {
                // Request wallet connection
                await provider.connect()

                // Get the connected wallet's public key
                const publicKey = provider.publicKey

                if (publicKey) {
                    return publicKey.toString()
                } else {
                    throw new Error('Public key is null')
                }
            } catch (err) {
                console.error('Error connecting to wallet:', err)
                throw err
            }
        } else {
            throw new Error('Solana object not found! Get a Phantom Wallet 👻')
        }
    }

    useEffect(() => {
        const returnPubKey = async () => {
            const publicaddress = await getWalletPublicKey()
            setPublicAddress(publicaddress)
        }
        returnPubKey()
    }, [publicAddress])

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
