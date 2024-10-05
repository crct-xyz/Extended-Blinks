'use client'

import { redirect } from 'next/navigation'

import { WalletButton } from '../solana/solana-provider'
import * as React from 'react'
import { type ReactNode, Suspense, useEffect, useRef } from 'react'
import { SocialIcon } from 'react-social-icons'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'

import { AccountChecker } from '../account/account-ui'
import { ClusterChecker, ExplorerLink } from '../cluster/cluster-ui'
import toast, { Toaster } from 'react-hot-toast'
import LogoIcon from 'components/icons/logo-icon'
import RegistrationComp from 'components/registration/registration'
import { useSessionStorage } from 'usehooks-ts'
import { useRouter } from 'next/navigation'

export function UiLayout({
    children,
}: {
    children: ReactNode
    links: { label: string; path: string }[]
}) {
    const { wallet, publicKey, connected } = useWallet()
    const [isRegistered, setIsRegistered] = React.useState<boolean>(false)
    const [value, setValue, removeValue] = useSessionStorage('is-registered', 0)
    const router = useRouter()
    console.log('isRegistered', isRegistered)
    const handleRegistration = async (telegramUser: string) => {
        try {
            await axios
                .post(
                    'http://ec2-52-59-228-70.eu-central-1.compute.amazonaws.com:8000/users',
                    {
                        wallet_public_key: publicKey,
                        telegram_username: telegramUser,
                    }
                )
                .then((res) => setIsRegistered(res.data.is_registered))
            // router.push('/order-page')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!connected) {
            router.push('/')
        }
        if (!isRegistered) {
            router.push('/')
        }
    }, [connected])

    useEffect(() => {
        if (!connected && !isRegistered) {
            router.push('/')
        }
    }, [connected])

    useEffect(() => {
        if (isRegistered) {
            router.push('/order-page')
        }
    }, [isRegistered])

    useEffect(() => {
        const getUser = async () => {
            if (publicKey?.toString()) {
                try {
                    await axios
                        .get(
                            `http://ec2-52-59-228-70.eu-central-1.compute.amazonaws.com:8000/users/${publicKey?.toString()}`
                        )
                        .then(function (response) {
                            setIsRegistered(response.data.is_registered)
                            setValue(response.data.is_registered)

                            console.log(response)
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                } catch (error) {
                    console.log('error', error)
                }
            }
            return null
        }
        getUser()
    }, [publicKey?.toString()])

    return (
        <div className="flex min-h-full flex-col bg-[#1E1E1E]">
            <div className="navbar bg-base-300 text-neutral-content border-light-white flex flex-row items-center justify-between rounded-xl border-2 border-solid px-2 py-2 md:px-10">
                <LogoIcon />
                <WalletButton />
            </div>
            <ClusterChecker>
                <AccountChecker />
            </ClusterChecker>
            <div className="flex grow flex-col justify-evenly px-5 pt-5 md:w-full">
                <Suspense
                    fallback={
                        <div className="my-32 text-center">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                    }
                >
                    {connected && !isRegistered ? (
                        <RegistrationComp
                            handleRegistration={handleRegistration}
                        />
                    ) : null}
                    {children}
                </Suspense>
                <Toaster position="bottom-right" />
            </div>
            <footer className="flex h-[70px] justify-center">
                <SocialIcon
                    url="https://x.com"
                    href="https://x.com/crct_xyz/"
                    target="_blank"
                />
            </footer>
        </div>
    )
}

export function AppModal({
    children,
    title,
    hide,
    show,
    submit,
    submitDisabled,
    submitLabel,
}: {
    children: ReactNode
    title: string
    hide: () => void
    show: boolean
    submit?: () => void
    submitDisabled?: boolean
    submitLabel?: string
}) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (!dialogRef.current) return
        if (show) {
            dialogRef.current.showModal()
        } else {
            dialogRef.current.close()
        }
    }, [show, dialogRef])

    return (
        <dialog
            className="modal"
            ref={dialogRef}
        >
            <div className="modal-box space-y-5">
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
                <div className="modal-action">
                    <div className="join space-x-2">
                        {submit ? (
                            <button
                                type="button"
                                className="btn btn-xs lg:btn-md btn-primary"
                                onClick={submit}
                                disabled={submitDisabled}
                            >
                                {submitLabel || 'Save'}
                            </button>
                        ) : null}
                        <button
                            type="button"
                            onClick={hide}
                            className="btn"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export function AppHero({
    children,
    title,
    subtitle,
}: {
    children?: ReactNode
    title: ReactNode
    subtitle: ReactNode
}) {
    return (
        <div className="hero py-[64px]">
            <div className="hero-content text-center">
                <div className="max-w-2xl">
                    {typeof title === 'string' ? (
                        <h1 className="text-5xl font-bold">{title}</h1>
                    ) : (
                        title
                    )}
                    {typeof subtitle === 'string' ? (
                        <p className="py-6">{subtitle}</p>
                    ) : (
                        subtitle
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}

export function ellipsify(str = '', len = 4) {
    if (str.length > 30) {
        return (
            str.substring(0, len) +
            '..' +
            str.substring(str.length - len, str.length)
        )
    }
    return str
}

export function useTransactionToast() {
    return (signature: string) => {
        toast.success(
            <div className={'text-center'}>
                <div className="text-lg">Transaction sent</div>
                <ExplorerLink
                    path={`tx/${signature}`}
                    label={'View Transaction'}
                    className="btn btn-xs btn-primary"
                />
            </div>
        )
    }
}
