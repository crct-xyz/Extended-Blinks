"use client";
import { Flex } from "components/flex/flex";
import LandingAnimation from "../components/landing-animation/landing-animation";
import type React from "react";
import { useState, FormEvent } from "react";
import SquadsIcon from "components/icons/squads-icon";
import YellowIcon from "components/icons/yellow-icon";
import TensorIcon from "components/icons/tensor-icon";

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
			<div className="flex flex-col justify-center items-center py-5  ">
				<div className="flex flex-col justify-center items-center  text-xl">
					<span className="text-[#00CED1]">ONE STOP SHOP PROVIDER FOR</span>
					<span className="text-white">CUSTOM CRYPTO ALERTS</span>
					<span className="text-[#00CED1]">AND EASY</span>
					<span className="text-white">EXECUTION</span>
				</div>
				<div className="flex flex-col md:flex-row h-full gap-12 py-10 justify-center items-center">
					<div className="flex flex-col gap-5 px-5 py-5 w-80 md:w-92 border-solid border-2 border-light-white rounded-lg bg-[#837e7e]">
						<button type="button">
							<SquadsIcon />
						</button>
						<button type="button">
							<YellowIcon />
						</button>
						<button type="button">
							<TensorIcon />
						</button>
					</div>
					<div className="flex flex-col gap-5 w-80 md:w-92 px-5 py-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e]">
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
					<div className="flex flex-col gap-5 w-80 md:w-92 px-5 py-5 border-solid border-2 border-light-white rounded-lg bg-[#837e7e] ">
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
				<div className="flex flex-col gap-5 text-center items-center">
					<p className="text-white">
						1. YOU SET UP YOUR <span className="text-[#00CED1]">USE CASE</span>
					</p>
					<p className="text-white">
						2. WE <span className="text-[#00CED1]">WE BUILD YOUR TX,</span> ONCE
						THE TRIGGER IS PULLED
					</p>
					<p className="text-white">
						3. WE <span className="text-[#00CED1]">SEND</span>THE EXECUTABLE{" "}
						<span className="text-[#00CED1]">TX TO YOU</span>
					</p>
					<p className="text-white">
						4. YOU <span className="text-[#00CED1]">EXECUTE YOUR TX</span>WITH A
						BLINK
					</p>
				</div>
				<div className="flex flex-col gap-5 text-center items-center mt-[40px]">
					<span className="text-[#00CED1]">COMING SOON</span>
				</div>
			</div>
		</div>
	);
}
