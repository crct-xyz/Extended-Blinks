'use client'
import ReviewUseCaseSquads from 'components/reviewUseCaseSquads/ReviewUseCaseSquads';
import SendUseCaseSquads from 'components/sendUseCaseSquads/SendUseCaseSquads'
import React, { useEffect, useState } from 'react'

function SquadsUseCases({data, updateData}) {
    console.log('gelo: ', data)
    const [showSend, setShowSend] = useState(false);
    const [showReview, setShowReview] = useState(false);

    // Function to handle button click
    const handleSquadsClick = () => {
        setShowSend(prevState => !prevState);
    }
    const handleReviewClick = () => {
        setShowReview((prevState) => !prevState);
        if (!showReview) {
            updateData({ action_event: {event_type: 'review_tx'} }); // Add action_event field
            console.log('dat: ', data);
        } else {
            updateData({ action_event: null }); // Remove or reset action_event field
            console.log(data);
        }
    };
    // useEffect(() => {
    //     if (!showReview) {
    //         setData({ event_type: 'review_tx' }) 
    //         console.log("data: ", data)
    //     } else {
    //         setData({}) 
    //         console.log("data: ", data)
    //     }
    // }, [showReview]) 

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
                        className="rounded-lg bg-[#D9D9D9] px-1 "
                    >
                        RESET THRESHOLD
                    </button>
                </div>
            </div>
            {showSend && <SendUseCaseSquads />}
            {showReview && <ReviewUseCaseSquads data={data} updateData={updateData}/>}
    </div>
  )
}

export default SquadsUseCases
