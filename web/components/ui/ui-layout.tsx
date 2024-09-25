"use client";

import { WalletButton } from "../solana/solana-provider";
import * as React from "react";
import { type ReactNode, Suspense, useEffect, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AccountChecker } from "../account/account-ui";
import {
	ClusterChecker,
	ClusterUiSelect,
	ExplorerLink,
} from "../cluster/cluster-ui";
import toast, { Toaster } from "react-hot-toast";

export function UiLayout({
	children,
	links,
}: {
	children: ReactNode;
	links: { label: string; path: string }[];
}) {
	const pathname = usePathname();

	return (
		<div className="h-full flex flex-col bg-black">
			<div
				className="navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0"
				style={{
					background:
						"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(114,9,121,1) 61%, rgba(0,212,255,1) 100%)",
				}}
			>
				<div className="flex-1">
					<Link className="btn btn-ghost normal-case text-xl" href="/">
						<Image
							className="h-4 md:h-6"
							alt="Logo"
							width={100}
							height={100}
							src="/logo.png"
						/>
					</Link>
					<ul className="menu menu-horizontal px-1 space-x-2">
						{links.map(({ label, path }) => (
							<li key={path}>
								<Link
									className={pathname.startsWith(path) ? "active" : ""}
									href={path}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex-none space-x-2">
					<WalletButton />
					<ClusterUiSelect />
				</div>
			</div>
			<ClusterChecker>
				<AccountChecker />
			</ClusterChecker>
			<div className="flex-grow mx-4 lg:mx-auto">
				<Suspense
					fallback={
						<div className="text-center my-32">
							<span className="loading loading-spinner loading-lg" />
						</div>
					}
				>
					{children}
				</Suspense>
				<Toaster position="bottom-right" />
			</div>
		</div>
	);
}

export function useTransactionToast() {
	return (signature: string) => {
		toast.success(
			<div className={"text-center"}>
				<div className="text-lg">Transaction sent</div>
				<ExplorerLink
					path={`tx/${signature}`}
					label={"View Transaction"}
					className="btn btn-xs btn-primary"
				/>
			</div>,
		);
	};
}
