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
            <div className="mt-[25px] mb-[25px] flex flex-col items-center gap-5 text-center">
            <a
                type="button"
                href="-"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-xl bg-[#00CED1] p-3 text-center text-black md:w-80"
            >
                PLACE ORDER
            </a>
            </div>
        </div>
    )
}

export default OrderPage
