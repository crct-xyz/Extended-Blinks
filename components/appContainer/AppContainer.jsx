'use client'
import JupyterIcon from 'components/icons/jupyter-icon'
import SquadsIcon from 'components/icons/squads-icon'
import TensorIcon from 'components/icons/tensor-icon'
import SquadsUseCases from 'components/squadsUseCasesContainer/SquadsUseCases'
import USDCuseCases from 'components/USDCuseCases/USDCuseCases'
import React, { useState } from 'react'

function AppContainer() {
    const [showSquads, setShowSquads] = useState(false);
    const [showUSDC, setShowUSDC] = useState(false);

    // Function to handle button click
    const handleSquadsClick = () => {
        setShowSquads(prevState => !prevState); // Show SquadsUseCases
    };
    const handleUSDCClick = () => {
        setShowUSDC(prevState => !prevState);
    }
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col text-center">
                <span className="mt-9 text-white">SELECT AN APP</span>
                <div className="border-light-white mt-3 flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] px-5 py-5 md:w-[11.5vw]">
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
                        JUPYTER
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
            {showSquads && <SquadsUseCases />}
            {showUSDC && <USDCuseCases />}
        </div>
    )
}

export default AppContainer
