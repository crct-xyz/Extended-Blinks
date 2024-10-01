'use client'
import { Flex } from 'components/flex/flex'
import JupyterIcon from 'components/icons/jupyter-icon'
import SquadsIcon from 'components/icons/squads-icon'
import TensorIcon from 'components/icons/tensor-icon'
import YellowIcon from 'components/icons/yellow-icon'
import type React from 'react'
import { FormEvent, Fragment, useState } from 'react'
import LandingAnimation from '../components/landing-animation/landing-animation'

export default function Page() {
    const [address, setAddress] = useState('')
    const baseUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://extended-blinks.vercel.app'
            : 'http://localhost:3000'

    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }

    const handleRedirection = () => {}

    // https://dial.to/?action=solana-action%3A${baseUrl}/api/action/approve?squad=${address}`

    return (
        <Fragment>
            <div className="flex flex-col gap-5 text-center items-center mt-[25px] mb-[25px]">
                <a
                    type="button"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfvzQslsbyG6G_-nuy6X61pIEE647RbEoProtxUrbY5xHzcyw/viewform?usp=sf_link"
                    target="_blank"
                    rel="noreferrer"
                    className="text-black bg-[#00CED1] rounded-xl p-3 w-full md:w-80"
                >
                    JOIN THE WAITLIST
                </a>
            </div>
            <div className="flex flex-col justify-center items-center text-xl text-center">
                <p className="md:w-[30rem]">
                    <span className="text-[#00CED1]">
                        ONE STOP SHOP PROVIDER FOR&nbsp;
                    </span>
                    <span className="text-white">CUSTOM CRYPTO ALERTS </span>
                    <span className="text-[#00CED1]">AND EASY </span>
                    <span className="text-white">EXECUTION</span>
                </p>
            </div>
            <div className="flex flex-col md:flex-row h-full gap-12 py-10 justify-center items-center flex-wrap">
                <div className="flex flex-col text-center">
                    <span className="text-white">SELECT AN APP</span>
                    <div className="flex flex-col justify-between items-center gap-5 px-5 py-5 mt-5 h-[332px] w-auto md:w-92 border-solid border-2 border-light-white rounded-lg bg-[#837e7e]">
                        <button type="button">
                            <SquadsIcon />
                        </button>
                        <button
                            type="button"
                            className="h-16 w-16"
                        >
                            <JupyterIcon />
                        </button>
                        <button type="button">
                          <TensorIcon />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col text-center">
                    <span className="text-white">CHOOSE YOUR USE CASE</span>
                    <div className="flex flex-col gap-5 w-auto md:w-92 px-5 py-5 mt-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e]">
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            SEND TX
                        </button>
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            REVIEW TX
                        </button>
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            DEPOSIT TX
                        </button>
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            CANCEL TX
                        </button>
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            BUY
                        </button>
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            ADD MEMBER
                        </button>
                        <button
                            type="button"
                            className="bg-[#D9D9D9] rounded-lg"
                        >
                            REMOVE MEMBER
                        </button>
                    </div>
                </div>
                <div className="flex flex-col text-center">
                    <span className="text-white">SELECT AN APP</span>
                    <div className="flex flex-col gap-5 w-auto md:w-92 px-5 py-5 mt-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e] ">
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            TIME
                        </button>
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            WALLET BALANCE
                        </button>
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            TRADING VOLUME
                        </button>
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            INCOMING TX
                        </button>
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            SWAP ACTION
                        </button>
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            WALLET ACTIVITY
                        </button>
                        <button
                            type="button"
                            className="bg-[#00CED1] rounded-lg px-2"
                        >
                            PENDING TX
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 text-center items-center">
                <p className="text-white">
                    1. YOU SET UP YOUR&nbsp;
                    <span className="text-[#00CED1]">USE CASE</span>
                </p>
                <p className="text-white">
                    2. WE
                    <span className="text-[#00CED1]"> BUILD YOUR TX,</span> ONCE
                    THE TRIGGER IS PULLED
                </p>
                <p className="text-white">
                    3. WE <span className="text-[#00CED1]">SEND&nbsp;</span>THE
                    EXECUTABLE <span className="text-[#00CED1]">TX TO YOU</span>
                </p>
                <p className="text-white">
                    4. YOU
                    <span className="text-[#00CED1]">&nbsp;EXECUTE YOUR TX&nbsp;</span>WITH
                    A BLINK
                </p>
            </div>
            <div className="flex flex-col gap-5 text-center items-center mt-[25px]">
                <span className="text-2xl font-semibold text-[#00CED1]">
                    COMING SOON
                </span>
            </div>
        </Fragment>
    )
}
