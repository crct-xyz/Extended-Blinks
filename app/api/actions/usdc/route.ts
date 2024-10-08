import {
    createActionHeaders,
    ActionGetResponse,
    createPostResponse,
    ActionPostRequest,
    ActionPostResponse,
    ACTIONS_CORS_HEADERS,
} from '@solana/actions'
import axios from 'axios'
import { NextRequest } from 'next/server'
import {
    PublicKey,
    Transaction,
    Connection,
    clusterApiUrl,
    Keypair,
    ParsedAccountData,
    LAMPORTS_PER_SOL,
    SystemProgram,
} from '@solana/web3.js'
import {
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    createTransferCheckedInstruction,
    getOrCreateAssociatedTokenAccount,
    transfer,
} from '@solana/spl-token'
import base58 from 'bs58'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'

const headers = createActionHeaders({
    chainId: 'mainnet',
    actionVersion: '2.2.1',
})
headers['Content-Type'] = 'application/json'

async function getOrderData(orderId: number) {
    const apiUrl = `https://squint-api.vercel.app/orders/${orderId.toString()}`
    console.log('api url: ', apiUrl)

    try {
        const response = await axios.get(apiUrl)
        const data = response.data
        if (!response.data) {
            throw new Error(`API request failed with status ${response.status}`)
        }
        return data
    } catch (error) {
        console.error('Error fetching data from API:', error)
        throw new Error('Failed to fetch order data.')
    }
}

export const GET = async (req: Request) => {
    try {
        // Extract order_id from query parameters

        const requestUrl = new URL(req.url)

        // Fetch order data from your API
        const orderData = await getOrderData(10)

        if (!orderData) {
            throw new Error('Order not found.')
        }

        // Extract necessary details from the order data
        const {
            order_id,
            action_event: {
                event_type,
                details: { telegram_username, amount, currency },
            },
        } = orderData

        let orderID
        if (event_type === 'USDC') {
            orderID = order_id
        }

        // Generate the Blink's action metadata
        const payload: ActionGetResponse = {
            title: 'Payment Request',
            icon: 'https://your-domain.com/icon.png', // Use your actual icon URL
            description: `${telegram_username} has requested ${amount} ${currency} from you.`,
            label: 'usdc',
            links: {
                actions: [
                    {
                        label: `Send ${amount} ${currency}`,
                        href: `/api/actions/usdc?action=send&amount=${amount}&orderID=${orderID}`,
                        type: 'transaction',
                    },
                    {
                        label: 'Reject Request',
                        href: `/api/usdc?`,
                        type: 'transaction',
                    },
                ],
            },
        }

        return Response.json(payload, { headers: ACTIONS_CORS_HEADERS })
    } catch (error) {
        console.log('error: ', error)
    }
}

export const OPTIONS = async () => {
    return new Response(null, { headers })
}

//gpt POST Starter
export const POST = async (req: Request) => {
    try {
        const requestUrl = new URL(req.url)
        const body: ActionPostRequest = await req.json()
        console.log('body:', body)
        const sender: PublicKey = new PublicKey(body.account)
        const receiver: PublicKey = new PublicKey(
            'AXsgLsDfEYBr7qb6vP5uYd2b194DhLVE8dCunRgt32pz'
        )

        // const senderWallet = Keypair.fromSecretKey()

        // Extract action and order_id from query parameters
        const { searchParams } = new URL(req.url)
        const action = searchParams.get('action')
        const sendAmount = Number.parseFloat(searchParams.get('amount')!)
        const orderId = Number.parseInt(searchParams.get('orderID')!)

        if (!action || !orderId) {
            throw new Error('Missing required parameters.')
        }

        // Fetch order data
        const orderData = await getOrderData(orderId)

        if (!orderData) {
            throw new Error('Order not found.')
        }

        const {
            action_event: {
                event_type,
                details: { telegram_username, amount, currency },
            },
        } = orderData

        let payload: ActionPostResponse

        if (action === 'send') {
            const USDC_MINT = new PublicKey(
                'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
            )
            const phantomWallet = new PhantomWalletAdapter()
            try {
                await phantomWallet.connect()
                const fromPublicKey = phantomWallet.publicKey
                console.log(fromPublicKey)
                if (!fromPublicKey) {
                    throw new Error('Wallet not connected!')
                }
            } catch (error) {
                console.log('error: ', error)
            }
        }
    } catch (error) {
        console.error('Error in POST handler:', error)
    }
}
// Function to fetch order data from your API

// Function to map telegram_username to Solana public key
async function getPublicKeyFromTelegramUsername(
    username: string
): Promise<PublicKey | null> {
    // Implement the logic to map the Telegram username to a Solana public key
    // This might involve querying your API or database
    // For example:
    const apiUrl = `https://your-api-endpoint.com/users/telegram/${username}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            console.error(`Failed to fetch public key for ${username}`)
            return null
        }
        const data = await response.json()
        const publicKeyString = data.publicKey // Adjust based on your API response

        return new PublicKey(publicKeyString)
    } catch (error) {
        console.error('Error fetching public key from API:', error)
        return null
    }
}
