'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import ConfirmationModal from 'components/confirmation-modal/confirmation-modal'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './order-page.module.css'

const OrderPage = () => {
    const [showSquads, setShowSquads] = useState(false)
    const [showUSDC, setShowUSDC] = useState(false)
    const [data, setData] = useState({}) // Use state to manage `data`
    const [showSend, setShowSend] = useState(false)
    const [showReview, setShowReview] = useState(false)
    const [showRequestUSDC, setShowRequestUSDC] = useState(false)
    const [vaultId, setVaultId] = useState('')
    const [tgUsername, setTgUsername] = useState('')
    const [recipients, setRecipients] = useState('')
    const [currency, setCurrency] = useState('')
    const [amount, setAmount] = useState('')
    const [isOrderSuccessfull, setisOrderSuccessfull] = useState<boolean>(false)
    const { publicKey, connected } = useWallet()
    const router = useRouter()
    const requiredFieldsFilled = Boolean(vaultId || recipients || tgUsername)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // reset the fields
        setAmount('')
        setTgUsername('')
        setCurrency('')
        setVaultId('')
        setRecipients('')

        // data for squads review order
        const postSquadsReviewData = {
            order_id: Math.floor(Math.random() * 50).toString(),
            app: 'SQUADS',
            action_event: {
                event_type: 'review_tx',
                details: {
                    vault_id: vaultId,
                    recipients: recipients,
                },
            },
            user_id: publicKey?.toString(),
            timestamp: Date.now(),
        }

        // data for usdc request order
        const usdcRequestData = {
            order_id: Math.floor(Math.random() * 50).toString(),
            app: 'USDC',
            action_event: {
                event_type: 'usdc_request',
                details: {
                    telegram_username: tgUsername,
                    amount: amount,
                    currency: currency,
                },
            },
            user_id: publicKey?.toString(),
            timestamp: Date.now(),
        }

        try {
            console.log('sopmqiefm')
            if (!postSquadsReviewData.action_event.details.vault_id) {
                const { data } = await axios.post(
                    'https://squint-api.vercel.app/orders/',
                    usdcRequestData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                setisOrderSuccessfull(true)
                return data
            } else {
                const { data } = await axios.post(
                    'https://squint-api.vercel.app/orders/',
                    postSquadsReviewData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                setisOrderSuccessfull(true)
                return data
            }
        } catch (error) {
            setisOrderSuccessfull(false)
            console.log('eror:', error)
        }
    }

    const handleVaultIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setVaultId(e.target.value)
    const handleRecipientsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setRecipients(e.target.value)
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTgUsername(e.target.value)
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(e.target.value)
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value)
    }
    const handleReviewClick = () => {
        setShowReview((prevState) => !prevState)
        if (!showReview) {
            updateData({ action_event: { event_type: 'review_tx' } }) // Add action_event field
            console.log('dat: ', data)
        } else {
            updateData({ action_event: null }) // Remove or reset action_event field
            console.log(data)
        }
    }
    const handleUSDCClick = () => {
        setShowSquads(false)
        setShowUSDC((prevState) => !prevState)
    }
    const handleSquadsClick = () => {
        setShowUSDC(false)
        setShowSquads((prevState) => !prevState)
    }
    const handleRequestUSDC = () => {
        setShowRequestUSDC((prevState) => !prevState)
    }

    const handleSuccessOrder = (value: boolean) => setisOrderSuccessfull(value)

    useEffect(() => {
        if (showSquads) {
            setData((prevData) => ({ ...prevData, app: 'squads' })) // Add the app field to data
        } else {
            setData((prevData) => {
                const newData = { ...prevData }

                //delete newData.app // Remove app field
                return newData
            })
        }
    }, [showSquads])

    //@ts-ignore
    const updateData = (newData) => {
        setData((prevData) => ({ ...prevData, ...newData }))
        console.log('updates: ', data)
    }

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
            <div className="flex flex-col items-center justify-center text-center">
                <div className="flex flex-col text-center">
                    <span className="mt-9 text-white">SELECT AN APP</span>
                    <div className="border-light-white mt-3 flex w-auto flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5">
                        <button
                            type="button"
                            className={`rounded-lg ${showSquads ? 'bg-[#00CED1]' : 'bg-[#D9D9D9]'}`}
                            onClick={handleSquadsClick}
                        >
                            SQUADS
                        </button>
                        <button
                            type="button"
                            className="rounded-lg bg-[#D9D9D9]"
                        >
                            JUPITER
                        </button>
                        <button
                            type="button"
                            className="rounded-lg bg-[#D9D9D9]"
                        >
                            TENSOR
                        </button>
                        <button
                            type="button"
                            className={`rounded-lg ${showUSDC ? 'bg-[#00CED1]' : 'bg-[#D9D9D9]'}`}
                            onClick={handleUSDCClick}
                        >
                            USDC
                        </button>
                    </div>
                </div>
                {/* <AppContainer /> */}
                {/* <Triggers /> */}
            </div>

            {showSquads && (
                <div className="flex flex-col text-center">
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="mt-9 text-white">
                            CHOOSE YOUR ACTION
                        </span>
                        <div className="border-light-white mt-3 flex w-auto flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5">
                            <button
                                type="button"
                                className={`rounded-lg px-1 ${showSend ? 'bg-[#00CED1]' : 'bg-[#D9D9D9]'}`}
                                onClick={handleSquadsClick}
                            >
                                SEND
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[#D9D9D9] px-1"
                            >
                                DEPOSIT
                            </button>
                            <button
                                type="button"
                                className={`rounded-lg ${showReview ? 'bg-[#00CED1]' : 'bg-[#D9D9D9]'}`}
                                onClick={handleReviewClick}
                            >
                                REVIEW TX
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[#D9D9D9] px-1"
                            >
                                CANCEL TX
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[#D9D9D9] px-1"
                            >
                                ADD MEMBER
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[#D9D9D9] px-1"
                            >
                                REMOVE MEMBER
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[#D9D9D9] px-1"
                            >
                                RESET THRESHOLD
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isOrderSuccessfull ? (
                <ConfirmationModal
                    setisOrderSuccessfull={setisOrderSuccessfull}
                />
            ) : null}
            {showReview && (
                <div className="flex flex-col items-center justify-center text-center">
                    <span className="mt-9 text-white">
                        PLEASE PROVIDE DETAILS FOR THE TX <br /> YOU WANT TO
                        BUILD
                    </span>
                    <form className="border-light-white mt-3 flex w-auto flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5">
                        <label
                            className="mb-[-1.5vh] text-left"
                            htmlFor="vaultId"
                        >
                            Vault ID
                        </label>
                        <input
                            id="vaultId"
                            className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                            type="text"
                            placeholder="Please enter value"
                            required
                            value={vaultId} // Bind input value to state
                            onChange={handleVaultIdChange}
                        />
                        <label
                            className="mb-[-1.5vh] text-left"
                            htmlFor="recipients"
                        >
                            Recipients
                        </label>
                        <input
                            id="recipients"
                            className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                            type="text"
                            placeholder="Please enter Telegram handle"
                            required
                            value={recipients} // Bind input value to state
                            onChange={handleRecipientsChange}
                        />
                    </form>
                </div>
            )}

            {showUSDC && (
                <div className="flex flex-col items-center justify-center text-center">
                    <span className="mt-9 text-white">CHOOSE YOUR ACTION</span>
                    <div className="border-light-white mt-3 flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5 md:w-[15.5vw]">
                        <button
                            type="button"
                            className={`rounded-lg ${showRequestUSDC ? 'bg-[#00CED1]' : 'bg-[#D9D9D9]'}`}
                            onClick={handleRequestUSDC}
                        >
                            REQUEST MONEY
                        </button>
                        <button
                            type="button"
                            className="rounded-lg bg-[#D9D9D9]"
                        >
                            BRIDGE USDC
                        </button>
                    </div>
                </div>
            )}

            {showRequestUSDC && (
                <div className="flex flex-col items-center justify-center text-center">
                    <span className="mt-9 text-white">
                        PLEASE PROVIDE DETAILS FOR THE TX <br /> YOU WANT TO
                        BUILD
                    </span>
                    <form className="border-light-white mt-3 flex w-auto flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5">
                        <label
                            className="mb-[-1.5vh] text-left"
                            htmlFor="tg_username"
                        >
                            Username
                        </label>
                        <input
                            id="tg_username"
                            className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                            type="text"
                            placeholder="Please enter username"
                            required
                            value={tgUsername}
                            onChange={handleUsernameChange}
                        />
                        <label
                            className="mb-[-1.5vh] text-left"
                            htmlFor="amount"
                        >
                            Amount
                        </label>
                        <input
                            id="amount"
                            className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                            type="number"
                            placeholder="Please enter amount"
                            required
                            value={amount} // Bind input value to state
                            onChange={handleAmountChange}
                        />
                        <label
                            className="mb-[-1.5vh] text-left"
                            htmlFor="currency"
                        >
                            Currency
                        </label>
                        <select
                            className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                            name="currency"
                            id="currency"
                            value={currency}
                            onChange={handleCurrencyChange}
                        >
                            <option
                                value=""
                                disabled
                                selected
                                hidden
                            >
                                Select a currency
                            </option>
                            <option value="usdc">USDC</option>
                            <option value="sol">Sol</option>
                            <option value="eth">Ethereum</option>
                        </select>
                    </form>
                </div>
            )}

            <div className="md:w-50 mt-[25px] mb-[25px] flex w-full flex-col items-center gap-5 text-center">
                <button
                    type="submit"
                    rel="noreferrer"
                    // disabled={!vaultId || !recipients}
                    className={`flex w-full items-center justify-center rounded-xl p-3 text-center md:w-80 ${requiredFieldsFilled ? 'cursor-pointer bg-[#00CED1] text-black' : 'cursor-not-allowed bg-[#b0dbdc] text-gray-100'}`}
                    onClick={handleSubmit}
                >
                    PLACE ORDER
                </button>
            </div>
        </div>
    )
}

export default OrderPage
