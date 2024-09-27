"use client";

import { WalletButton } from "../solana/solana-provider";
import { Orbitron } from "next/font/google";
import * as React from "react";
import { type ReactNode, Suspense, useEffect, useRef } from "react";
import { SocialIcon } from "react-social-icons";

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
import LogoIcon from "components/icons/logo-icon";

const orbitron = Orbitron({ subsets: ["latin"] });

export function UiLayout({
	children,
	links,
}: {
	children: ReactNode;
	links: { label: string; path: string }[];
}) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col md:h-full bg-[#1E1E1E]">
			<div className="flex flex-row items-center navbar bg-base-300 text-neutral-content px-4 md:px-10 py-2 justify-between rounded-xl border-solid border-2 border-light-white">
				<LogoIcon />
				<SocialIcon url="https://x.com" />
				<WalletButton />
			</div>
			<ClusterChecker>
				<AccountChecker />
			</ClusterChecker>
			<div className="flex-grow">
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

export function AppModal({
	children,
	title,
	hide,
	show,
	submit,
	submitDisabled,
	submitLabel,
}: {
	children: ReactNode;
	title: string;
	hide: () => void;
	show: boolean;
	submit?: () => void;
	submitDisabled?: boolean;
	submitLabel?: string;
}) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!dialogRef.current) return;
		if (show) {
			dialogRef.current.showModal();
		} else {
			dialogRef.current.close();
		}
	}, [show, dialogRef]);

	return (
		<dialog className="modal" ref={dialogRef}>
			<div className="modal-box space-y-5">
				<h3 className="font-bold text-lg">{title}</h3>
				{children}
				<div className="modal-action">
					<div className="join space-x-2">
						{submit ? (
							<button
								type="button"
								className="btn btn-xs lg:btn-md btn-primary"
								onClick={submit}
								disabled={submitDisabled}
							>
								{submitLabel || "Save"}
							</button>
						) : null}
						<button type="button" onClick={hide} className="btn">
							Close
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
}

export function AppHero({
	children,
	title,
	subtitle,
}: {
	children?: ReactNode;
	title: ReactNode;
	subtitle: ReactNode;
}) {
	return (
		<div className="hero py-[64px]">
			<div className="hero-content text-center">
				<div className="max-w-2xl">
					{typeof title === "string" ? (
						<h1 className="text-5xl font-bold">{title}</h1>
					) : (
						title
					)}
					{typeof subtitle === "string" ? (
						<p className="py-6">{subtitle}</p>
					) : (
						subtitle
					)}
					{children}
				</div>
			</div>
		</div>
	);
}

export function ellipsify(str = "", len = 4) {
	if (str.length > 30) {
		return (
			str.substring(0, len) + ".." + str.substring(str.length - len, str.length)
		);
	}
	return str;
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
