'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useWallet } from '@solana/wallet-adapter-react'
import { useUserContext } from 'providers/context-provider/context-provider'

function ReviewUseCaseSquads({ data, updateData }) {
    const {publicKey} = useWallet()
    const { isRegistered, setIsRegistered, setIsOrderSuccessfull, isOrderSuccessfull } = useUserContext()
    const [vaultId, setVaultId] = useState('')
    const [recipients, setRecipients] = useState('')
    const apiUrl = 'https://squint-api.vercel.app/orders/'
    const requiredFieldsFilled = Boolean(vaultId && recipients)
    // Handle form input changes
    const handleVaultIdChange = (e) =>  setVaultId(e.target.value)
    const handleRecipientsChange = (e) => setRecipients(e.target.value)
console.log('isOrderSuccessfull', isOrderSuccessfull);

    const handleSubmit = async(e) => {
        e.preventDefault()
        const postData = {
            order_id: (Math.floor(Math.random() * 50)).toString(),
            app: data.app,
            action_event: {
                event_type: 'review_tx',
                details: {
                    vault_id: vaultId,
                    recipients
                }
            },
            user_id: publicKey.toString(),
            timestamp: Date.now()
        }
        try {
             const a = await axios.post(apiUrl, postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsOrderSuccessfull(true)
        }
        catch(error) {
          setIsOrderSuccessfull(false)
            console.log("eror:", error);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <span className="mt-9 text-white">
                PLEASE PROVIDE DETAILS FOR THE TX <br /> YOU WANT TO BUILD
            </span>
            <form
                onSubmit={handleSubmit}
                className="border-light-white mt-3 flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5 w-auto"
            >
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
                    placeholder="Please enter recipient address"
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
                    placeholder="Please enter token ID"
                    required
                    value={recipients} // Bind input value to state
                    onChange={handleRecipientsChange}
                />
            </form>
            <div className="mt-[25px] mb-[25px] flex flex-col items-center gap-5 text-center">
                    <button
                        type="submit"
                        href="-"
                        target="_blank"
                        rel="noreferrer"
                        disabled={!vaultId || !recipients}
                        className={`flex w-full items-center justify-center rounded-xl p-3 text-center  md:w-80 ${requiredFieldsFilled ? "bg-[#00CED1] text-black cursor-pointer" : "bg-[#b0dbdc] text-gray-100 cursor-not-allowed"}`}
                        onClick={handleSubmit}
                    >
                        PLACE ORDER
                    </button>
                </div>
        </div>
    )
}

export default ReviewUseCaseSquads
