const RegistrationComp = () => {
    return (
        <div className="xs:w-96 flex w-auto flex-col gap-5">
            <div className="flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] p-6 text-center">
                <span className="font-bold text-black">USERNAME</span>
                <input
                    type="text"
                    placeholder="PUBKEY"
                    className="rounded-md px-1 placeholder:p-2 placeholder:text-black"
                />
            </div>
            <div className="flex flex-col gap-5 rounded-lg border-2 border-solid bg-[#837e7e] p-6 text-center">
                <span className="font-bold text-black">
                    HOW DO YOU WANT TO GET NOTIFIED?
                </span>
                <div className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="TELEGRAM"
                        className="rounded-md px-1 placeholder:p-2 placeholder:text-black"
                    />
                    <input
                        type="text"
                        placeholder="X"
                        className="rounded-md px-1 placeholder:p-2 placeholder:text-black"
                    />
                </div>
            </div>
        </div>
    )
}

export default RegistrationComp
