'use client'
import SendUseCaseSquads from 'components/sendUseCaseSquads/SendUseCaseSquads'
import React, { useState } from 'react'

function SquadsUseCases() {

    const [showSend, setShowSend] = useState(false);

    // Function to handle button click
    const handleSquadsClick = () => {
        setShowSend(prevState => !prevState);
    }

  return (
    <div className='flex flex-col text-center'>
        <div className="flex flex-col text-center justify-center items-center">
                <span className="mt-9 text-white">CHOOSE YOUR ACTION</span>
                <div className="border-light-white mt-3 flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5 w-auto">
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
                        className="rounded-lg bg-[#D9D9D9] px-1"
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
                        className="rounded-lg bg-[#D9D9D9] px-1 "
                    >
                        RESET THRESHOLD
                    </button>
                </div>
            </div>
            {showSend && <SendUseCaseSquads />}
    </div>
  )
}

export default SquadsUseCases
