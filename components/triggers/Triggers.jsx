import React from 'react'

function Triggers() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col text-center items-center justify-center">
                <span className="mt-9 text-white">SET YOUR CUSTOM TRIGGERS</span>
                <div className="border-light-white mt-3 flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5 md:w-[15.5vw]">
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        TIME
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        WALLET BALANCE
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        TRADING VOLUME
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        PENDING TX
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        INCOMING TX
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        SWAP ACTION
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-[#D9D9D9]"
                    >
                        WALLET ACTIVITY
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Triggers