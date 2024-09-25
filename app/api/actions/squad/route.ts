import {
	createActionHeaders,
	NextActionPostRequest,
	ActionError,
	CompletedAction,
	ACTIONS_CORS_HEADERS,
	ActionGetRequest,
	type ActionGetResponse,
	type ActionPostRequest,
	type ActionPostResponse,
	createPostResponse,
} from "@solana/actions";
import {
	SystemProgram,
	clusterApiUrl,
	Connection,
	PublicKey,
	Transaction,
	TransactionInstruction,
	ComputeBudgetProgram,
	LAMPORTS_PER_SOL,
	TransactionMessage,
} from "@solana/web3.js";
import * as multisig from "@sqds/multisig";

async function validatedQueryParams(requestUrl: URL) {
	let multisigAddress = "";
	let wallet = "";
	let amount = 0;
	let action = "";

	if (requestUrl.searchParams.get("address")) {
		multisigAddress = requestUrl.searchParams.get("address")!;
	}
	if (requestUrl.searchParams.get("wallet")) {
		wallet = requestUrl.searchParams.get("wallet")!;
	}
	if (requestUrl.searchParams.get("amount")) {
		amount = Number.parseFloat(requestUrl.searchParams.get("amount")!);
	}
	if (requestUrl.searchParams.get("action")) {
		action = requestUrl.searchParams.get("action")!;
	}
	return { multisigAddress, amount, action, wallet };
}
export const GET = async (req: Request) => {
	const requestUrl = new URL(req.url);
	const { multisigAddress } = await validatedQueryParams(requestUrl);
	const connection = new Connection(clusterApiUrl("mainnet-beta"));

	const multisigPda = new PublicKey(multisigAddress);
	const [vault_account] = multisig.getVaultPda({
		multisigPda,
		index: 0,
	});
	const multisigAccount = await multisig.accounts.Multisig.fromAccountAddress(
		connection,
		multisigPda,
	);
	const multisigInfo = await fetch(
		`https://v4-api.squads.so/multisig/${vault_account.toString()}`,
	).then((res) => res.json());
	const metadata = multisigInfo.metadata;

	const payload: ActionGetResponse = {
		title: `${metadata.name}`,
		icon: `https://ucarecdn.com/7ae08282-2d17-4025-8206-8991c0a5865d/-/preview/1030x1030/`,
		description: `send money brokie`,
		label: "squads",
		links: {
			actions: [
				{
					label: "Send",
					href: `/api/actions/squad?address=${multisigAddress}&action=send&amount={sendAmount}&wallet={wallet}`,
					parameters: [
						{
							name: "sendAmount",
							label: "Amount",
							required: true,
						},
						{
							name: "wallet",
							label: "Wallet Address of Recipient",
							required: true,
						},
					],
				},
			],
		},
	};

	return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
	const requestUrl = new URL(req.url);
	const body: ActionPostRequest = await req.json();
	const payerAccount: PublicKey = new PublicKey(body.account);
	const { multisigAddress, action, amount, wallet } =
		await validatedQueryParams(requestUrl);
	const connection = new Connection(clusterApiUrl("mainnet-beta"));

	const multisigPda = new PublicKey(multisigAddress);
	const [vault_account] = multisig.getVaultPda({
		multisigPda,
		index: 0,
	});
	const multisigAccount = await multisig.accounts.Multisig.fromAccountAddress(
		connection,
		multisigPda,
	);
	const multisigInfo = await fetch(
		`https://v4-api.squads.so/multisig/${vault_account.toString()}`,
	).then((res) => res.json());
	const metadata = multisigInfo.metadata;

	const baseHref = new URL(
		`/api/actions/squad/${multisigAddress}`,
		requestUrl.origin,
	).toString();

	const txnIndex = multisigAccount.transactionIndex;
	const finalTxnIndex = Number(txnIndex) + 1;
	const transaction = new Transaction();

	if (action == "send") {
		const transferInstruction = SystemProgram.transfer({
			fromPubkey: vault_account,
			toPubkey: new PublicKey(wallet),
			lamports: amount * LAMPORTS_PER_SOL,
		});
		const transferMessage = new TransactionMessage({
			payerKey: vault_account,
			recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
			instructions: [transferInstruction],
		});
		const IX1 = multisig.instructions.vaultTransactionCreate({
			multisigPda,
			transactionIndex: BigInt(Number(txnIndex) + 1),
			creator: payerAccount,
			vaultIndex: 0,
			ephemeralSigners: 0,
			transactionMessage: transferMessage,
		});
		transaction.add(IX1);
	}

	transaction.feePayer = payerAccount;
	transaction.recentBlockhash = (
		await connection.getLatestBlockhash()
	).blockhash;

	const payload: ActionPostResponse = await createPostResponse({
		fields: {
			transaction,
			message: "",
			links: {
				next: {
					type: "inline",
					action: {
						type: "action",
						title: `${metadata.name}`,
						icon: `https://ucarecdn.com/7ae08282-2d17-4025-8206-8991c0a5865d/-/preview/1030x1030/`,
						description: `vote on transaction number ${finalTxnIndex}`,
						label: "squads",
						links: {
							actions: [
								{
									label: "Approve",
									href: `${baseHref}?action=approve&multisigAddress=${multisigAddress}&txIndex=${finalTxnIndex}`,
								},
								{
									label: "Reject",
									href: `${baseHref}?action=reject&multisigAddress=${multisigAddress}&txIndex=${finalTxnIndex} `,
								},
								{
									label: "Execute",
									href: `${baseHref}?action=execute&multisigAddress=${multisigAddress}&txIndex=${finalTxnIndex}`,
								},
							],
						},
					},
				},
			},
		},
	});

	return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
};
