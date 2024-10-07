'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import AppContainer from 'components/appContainer/AppContainer'
import ConfirmationModal from 'components/confirmation-modal/confirmation-modal'
import SquadsUseCases from 'components/squadsUseCasesContainer/SquadsUseCases'
import Triggers from 'components/triggers/Triggers'
import { usePathname, useRouter } from 'next/navigation'
import { useUserContext } from 'providers/context-provider/context-provider'
import React from 'react'
import styles from './order-page.module.css'

const OrderPage = () => {
    const { isRegistered, setIsRegistered } = useUserContext()
    const { wallet, publicKey, connected } = useWallet()
    const router = useRouter()
    const pathname = usePathname()

    // const handleSubmit = async (
    //     event: React.MouseEvent<HTMLButtonElement>,
    //     vaultId: string,
    //     recipients: string
    // ) => {
    //     event.preventDefault()
    //     const postData = {
    //         order_id: Math.floor(Math.random() * 50).toString(),
    //         app: data.app,
    //         action_event: {
    //             event_type: 'review_tx',
    //             details: {
    //                 vault_id: vaultId,
    //                 recipients,
    //             },
    //         },
    //         user_id: publicKey?.toString(),
    //         timestamp: Date.now(),
    //     }
    //     try {
    //         await axios.post(apiUrl, postData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //     } catch (error) {
    //         console.log('eror:', error)
    //     }
    // }

    React.useEffect(() => {
        if (!connected) {
            router.push('/')
        }
    }, [connected, router])

    return (
        <div className={styles.container}>
            <div className="flex items-center justify-center text-center text-5xl">
                <p className="w-auto leading-tight">
                    <span className="text-[#00CED1]">SET UP&nbsp;</span>
                    <span className="text-white">YOUR </span>
                    <br />
                    <span className="text-[#00CED1]">FIRST </span>
                    <span className="text-white">ORDER</span>
                </p>
            </div>
            {/* <ConfirmationModal /> */}
            <AppContainer />
            {/* <Triggers /> */}
        </div>
    )
}

export default OrderPage
