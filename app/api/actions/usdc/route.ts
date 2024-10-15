import {
    ActionGetResponse,
    ActionPostRequest,
    ActionPostResponse,
    ACTIONS_CORS_HEADERS,
    createPostResponse,
} from '@solana/actions'
import {
    createAssociatedTokenAccount,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    getAssociatedTokenAddress,
} from '@solana/spl-token'
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
} from '@solana/web3.js'

export const GET = async (req: Request) => {
    // get payload
    const payload: ActionGetResponse = {
        title: 'USDC money request',
        icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
        description: 'test blink',
        label: 'click',
        links: {
            actions: [
                {
                    href: `/api/actions/usdc?destinationAddress={destinationAddress}&amount={amount}`,
                    label: 'SEND',
                    parameters: [
                        {
                            label: 'Enter recipient address',
                            name: 'destinationAddress',
                            required: true,
                        },
                        {
                            label: 'Enter usdc',
                            name: 'amount',
                            required: true,
                        },
                    ],
                    type: 'transaction',
                },
            ],
        },
    }

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS })
}

// options to handle the headers
export const OPTIONS = GET

export const POST = async (req: Request) => {
    // getting the url params
    const requestUrl = new URL(req.url)
    const { destinationAddress, amount } =
        await validatedQueryParams(requestUrl)

    // sender and receiver public key
    const body: ActionPostRequest = await req.json()
    const sender: PublicKey = new PublicKey(body.account)
    const receiver: PublicKey = new PublicKey(destinationAddress)

    // solana connection
    const connection = new Connection(clusterApiUrl('mainnet-beta'))

    // usdc mint address
    const usdcMintAddress = new PublicKey(
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    )

    const senderTokenAccount = await getAssociatedTokenAddress(
        usdcMintAddress,
        sender
    )
    const receiverTokenAccount = await getAssociatedTokenAddress(
        usdcMintAddress,
        receiver
    )

    const transaction = new Transaction()

    // check if the receiver's token account exists
    const senderTokenAccountInfo =
        await connection.getAccountInfo(receiverTokenAccount)
    if (!senderTokenAccountInfo) {
        console.log('transaction added')
        transaction.add(
            createAssociatedTokenAccountInstruction(
                sender,
                receiverTokenAccount,
                receiver,
                usdcMintAddress
            )
        )
    }

    // transaction logic
    transaction.add(
        createTransferInstruction(
            senderTokenAccount,
            receiverTokenAccount,
            sender,
            Number(amount) * 1e6
        )
    )

    transaction.feePayer = sender
    transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
    ).blockhash

    // post payload
    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: 'action completed',
            type: 'transaction',
        },
    })

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS })
}

async function validatedQueryParams(requestUrl: URL) {
    let destinationAddress = requestUrl.searchParams.get('destinationAddress')!
    let amount = requestUrl.searchParams.get('amount')!

    return { destinationAddress, amount }
}
