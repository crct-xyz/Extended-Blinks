"use client"
import React from 'react'
import styles from './order-page.module.css'
import AppContainer from 'components/appContainer/AppContainer'
import SquadsUseCases from 'components/squadsUseCasesContainer/SquadsUseCases'
import Triggers from 'components/triggers/Triggers'
import { useWallet } from '@solana/wallet-adapter-react'

function OrderPage() {

    return (
        <div className={styles.container}>
            <div className="flex items-center justify-center text-center text-5xl">
                <p className="leading-tight md:w-[30rem]">
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
