"use client";
import LandingAnimation from "@/components/landing-animation/landing-animation";
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
		<div style={{ display: "flex", flexDirection: "column" }}>
			<LandingAnimation />

			<a href="/bot">bot</a>
		</div>
	);
}
