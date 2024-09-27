"use client";
import { Flex } from "components/flex/flex";
import LandingAnimation from "../components/landing-animation/landing-animation";
import type React from "react";
import { useState, FormEvent } from "react";

export default function Page() {
	const [address, setAddress] = useState("");
	const baseUrl =
		process.env.NODE_ENV === "production"
			? "https://extended-blinks.vercel.app"
			: "http://localhost:3000";

	const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value);
	};

	const handleRedirection = () => {};

	// https://dial.to/?action=solana-action%3A${baseUrl}/api/action/approve?squad=${address}`

	return (
		<div className="flex flex-col justify-center items-center md:w-full">
			<div className="flex flex-col justify-center items-center ">
				{/* <LandingAnimation /> */}
				<div className="flex flex-col justify-center items-center pt-5 text-xl">
					<span className="text-[#00CED1]">ONE STOP SHOP PROVIDER FOR</span>
					<span className="text-white">CUSTOM CRYPTO ALERTS</span>
					<span className="text-[#00CED1]">AND EASY</span>
					<span className="text-white">EXECUTION</span>
				</div>
				<div className="flex flex-col md:flex-row h-full gap-12 py-10 justify-center items-center">
					<div className="flex flex-col gap-5 w-48 px-5 py-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e]">
						<button type="button" className="bg-red-600 rounded-lg">
							send
						</button>
						<button type="button" className="bg-red-600 rounded-lg">
							deposit
						</button>
						<button type="button" className="bg-red-600 rounded-lg">
							review Tx
						</button>
						<button type="button" className="bg-red-600 rounded-lg">
							cancel Tx
						</button>
						<button type="button" className="bg-red-600 rounded-lg">
							buy
						</button>
						<button type="button" className="bg-red-600 rounded-lg">
							sell
						</button>
						<button type="button" className="bg-red-600 rounded-lg">
							...
						</button>
					</div>
					<div className="flex flex-col gap-5 w-48 px-5 py-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e]">
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							send
						</button>
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							deposit
						</button>
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							review Tx
						</button>
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							cancel Tx
						</button>
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							buy
						</button>
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							sell
						</button>
						<button type="button" className="bg-[#D9D9D9] rounded-lg">
							...
						</button>
					</div>
					<div className="flex flex-col gap-5 w-48 px-5 py-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e] ">
						<button type="button" className="bg-[#00CED1]">
							block time
						</button>
						<button type="button" className="bg-[#00CED1]">
							wallet balance
						</button>
						<button type="button" className="bg-[#00CED1]">
							tranding volume
						</button>
						<button type="button" className="bg-[#00CED1]">
							pending TX
						</button>
						<button type="button" className="bg-[#00CED1]">
							time delta
						</button>
						<button type="button" className="bg-[#00CED1]">
							an incoming TX
						</button>
						<button type="button" className="bg-[#00CED1]">
							...
						</button>
					</div>
				</div>

				{/* <a href="/bot">bot</a> */}
			</div>
		</div>
	);
}
