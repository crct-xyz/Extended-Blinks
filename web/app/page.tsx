"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SocialIcon } from "react-social-icons";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import type React from "react";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

const SelectMenu = ({ values }: { values?: string[] }) => {
	return (
		<Select>
			<SelectTrigger
				style={{ outline: "1px solid darkgray" }}
				className="w-[180px] "
			>
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent style={{ backgroundColor: "white" }}>
				{values?.map((value) => {
					return (
						<SelectItem key={value} value={value}>
							{value}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

export default function Page() {
	const { connected } = useWallet();
	const [address, setAddress] = useState("");
	const baseUrl =
		process.env.NODE_ENV === "production"
			? "https://extended-blinks.vercel.app"
			: "http://localhost:3000";

	const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value);
	};

	// https://dial.to/?action=solana-action%3A${baseUrl}/api/action/approve?squad=${address}`

	if (connected) {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Card style={{ maxWidth: "300px", backgroundColor: "lightgray" }}>
					<CardHeader style={{ gap: "5px" }}>
						<CardTitle style={{ color: "black" }}>
							What kind of transaction do you want to make?
						</CardTitle>
						<CardDescription>
							<SelectMenu values={["Approve", "Deposit", "Vote"]} />
						</CardDescription>
					</CardHeader>
					<CardHeader style={{ gap: "5px" }}>
						<CardTitle style={{ color: "black" }}>
							Which kind of transaction you wanna get triggered?
						</CardTitle>
						<SelectMenu values={["Approve", "Deposit", "Vote"]} />
					</CardHeader>
					<CardHeader style={{ gap: "5px" }}>
						<CardTitle style={{ color: "black" }}>
							What event should trigger the Blink generation?
						</CardTitle>
						<SelectMenu values={["Approve", "Deposit", "Vote"]} />
					</CardHeader>
					<CardContent>
						<CardTitle style={{ color: "black" }}>
							How do you want to be notified?
						</CardTitle>
						<div
							style={{
								display: "flex",
								justifyContent: "space-around",
								marginTop: "10px",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "5px",
								}}
							>
								<SocialIcon
									href="javascript:void(0)"
									url="https://telegram.com"
									style={{
										pointerEvents: "none",
										width: "30px",
										height: "30px",
									}}
								/>
								<Checkbox />
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "5px",
								}}
							>
								<SocialIcon
									href="javascript:void(0)"
									url="https://x.com"
									style={{
										pointerEvents: "none",
										width: "30px",
										height: "30px",
									}}
								/>
								<Checkbox />
							</div>
						</div>
					</CardContent>
					<CardHeader style={{ gap: "5px" }}>
						<CardTitle style={{ color: "black" }}>
							What is your Telegram Handle?
						</CardTitle>
						<Input
							placeholder="Type your"
							style={{ outline: "1px solid darkgray" }}
						/>
					</CardHeader>
					<CardContent style={{ display: "flex", justifyContent: "center" }}>
						<Button variant="primary" size="lg">
							Submit
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}
}
