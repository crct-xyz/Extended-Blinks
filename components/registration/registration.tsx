'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import { useState } from 'react'
import { SocialIcon } from 'react-social-icons'

const RegistrationComp = () => {
    const [open, setOpen] = useState(true)
    const [setTelegramUsername, setsetTelegramUsername] = useState('' as string)
    const { wallet, publicKey } = useWallet()
    const handleRegistration = async () => {
        try {
            await axios.post(
                'http://ec2-52-59-228-70.eu-central-1.compute.amazonaws.com:8000/users',
                {
                    wallet_public_key: publicKey,
                    telegram_username: setTelegramUsername,
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={setOpen}
            className="relative z-10"
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="xs:w-96 flex w-auto flex-col gap-5">
                            <div className="flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] p-6 text-center">
                                <SocialIcon
                                    url="https://telegram.com"
                                    href="https://telegram.com/"
                                    target="_blank"
                                />
                                <div className="flex flex-col gap-3 text-start">
                                    <label htmlFor="telegram">Telegram</label>
                                    <input
                                        type="text"
                                        id="telegram"
                                        name="telegram"
                                        placeholder="Enter your Telegram handle"
                                        className="rounded-md px-1 placeholder:p-2 placeholder:text-black"
                                        onChange={(e) =>
                                            setsetTelegramUsername(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <button
                                    className="animate-bounce rounded-lg bg-[#00CED1]"
                                    onClick={handleRegistration}
                                >
                                    REGISTER
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default RegistrationComp
