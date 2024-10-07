'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useWallet } from '@solana/wallet-adapter-react'
import { useUserContext } from 'providers/context-provider/context-provider'

function ReviewUseCaseSquads({ data, updateData }) {
    const {publicKey} = useWallet()
    const { isRegistered, setIsRegistered, setIsOrderSuccessfull, isOrderSuccessfull, setIsMyRecipients, setMyValueId } = useUserContext()
    const [vaultId, setVaultId] = useState('')
    const [recipients, setRecipients] = useState('')
    const apiUrl = 'https://squint-api.vercel.app/orders/'
    const requiredFieldsFilled = Boolean(vaultId && recipients)
    // Handle form input changes
    const handleVaultIdChange = (e) =>  setMyValueId(e.target.value)
    const handleRecipientsChange = (e) => setIsMyRecipients(e.target.value)
console.log('isOrderSuccessfull', isOrderSuccessfull);


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
    )
}

export default ReviewUseCaseSquads
