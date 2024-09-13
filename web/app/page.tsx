"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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

	const SelectMenu = ({ values }: { values?: string[] }) => {
		return (
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="" />
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
	// https://dial.to/?action=solana-action%3A${baseUrl}/api/action/approve?squad=${address}`

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<input type="text" onChange={handleAddress} />
			<a
				href={`https://dial.to/?action=solana-action%3A${baseUrl}/api/actions/squad?address=${address}`}
			>
				Make transaction
			</a>
			<a
				href={`https://dial.to/?action=solana-action%3A${baseUrl}/api/actions/squad/config?address=${address}`}
			>
				Config wallet
			</a>
			<a
				href={`https://dial.to/?action=solana-action%3A${baseUrl}/api/actions/squad/deposit?address=${address}`}
			>
				Deposit
			</a>
			<a
				href={`https://dial.to/?action=solana-action%3A${baseUrl}/api/actions/squad/vote?address=${address}`}
			>
				vote on a given transaction
			</a>
			<Card style={{ maxWidth: "300px" }}>
				<CardHeader>
					<CardTitle>What kind of transaction do you want to make?</CardTitle>
					<CardDescription>
						<SelectMenu values={["Approve", "Deposit", "Vote"]} />
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Which kind of transaction you wanna get triggered?</p>
					<SelectMenu values={["Approve", "Deposit", "Vote"]} />
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
					<Input />
				</CardFooter>
			</Card>

			<a href="/bot">bot</a>
		</div>
	);
}
