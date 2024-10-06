"use client"
import React from 'react'
import styles from './order-page.module.css'
import AppContainer from 'components/appContainer/AppContainer'
import SquadsUseCases from 'components/squadsUseCasesContainer/SquadsUseCases'
import Triggers from 'components/triggers/Triggers'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../context/context-provider'


function OrderPage() {
  const [isRegistered, setIsRegistered] = useUserContext()
  const { wallet, publicKey, connected } = useWallet()
  const router = useRouter()

   React.useEffect(() => {
        if (connected && isRegistered) {
            router.push('/order-page')
        }
    }, [connected, isRegistered, router.push])

    return (
        <div className={styles.container}>
            <div className="flex items-center justify-center text-center text-5xl">
                <p className="leading-tight w-auto">
                    <span className="text-[#00CED1]">SET UP&nbsp;</span>
                    <span className="text-white">YOUR </span>
                    <br />
                    <span className="text-[#00CED1]">FIRST </span>
                    <span className="text-white">ORDER</span>
                </p>
            </div>
            <AppContainer />
            <Triggers />
        </div>
    )
}

export default OrderPage
