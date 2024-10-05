import React from 'react'

function SendUseCaseSquads() {
    return (
        <div className="flex flex-col text-center">
            <div className="flex flex-col items-center justify-center text-center">
                <span className="mt-9 text-white">
                    PLEASE PROVIDE DETAILS FOR THE TX <br /> YOU WANT TO BUILD
                </span>
                <form className="border-light-white mt-3 flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5 md:w-[15.5vw]">
                    <label
                        className="mb-[-1.5vh] text-base"
                        htmlFor="recipientAddress"
                    >
                        Recipient address
                    </label>
                    <input
                        id="recipientAddress"
                        className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                        type="text"
                        placeholder="Please enter recipient address"
                    />
                    <label
                        className="mb-[-1.5vh] text-base"
                        htmlFor="amount"
                    >
                        Amount
                    </label>
                    <input
                        id="amount"
                        className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                        type="number"
                        placeholder="Please enter amount"
                    />
                    <label
                        className="mb-[-1.5vh] text-base"
                        htmlFor="asset"
                    >
                        Token Account ID
                    </label>
                    <input
                        id="asset"
                        className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                        type="text"
                        placeholder="Please enter token ID"
                    />
                    <label
                        className="mb-[-1.5vh] text-base"
                        htmlFor="vaultId"
                    >
                        Squads Vault ID
                    </label>
                    <input
                        id="vaultId"
                        className="rounded-lg bg-[#D9D9D9] px-2 placeholder:text-xs"
                        type="text"
                        placeholder="Please enter vault ID"
                    />
                </form>
            </div>
        </div>
    )
}

export default SendUseCaseSquads
