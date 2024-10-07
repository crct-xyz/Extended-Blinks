import { createActionHeaders, ActionGetResponse } from '@solana/actions'
import { NextRequest } from 'next/server'

const headers = createActionHeaders({
    chainId: 'mainnet',
    actionVersion: '2.2.1',
})
headers['Content-Type'] = 'application/json'

export const GET = async (req: NextRequest) => {
    try {
        // Extract order_id from query parameters
        const { searchParams } = new URL(req.url)

        // Fetch order data from your API
        const orderData = await getOrderData('3')

        if (!orderData) {
            throw new Error('Order not found.')
        }

        // Extract necessary details from the order data
        const {
            action_event: {
                event_type,
                details: { telegram_username, amount, currency },
            },
        } = orderData

        // Generate the Blink's action metadata
        const payload: ActionGetResponse = {
            title: 'Payment Request',
            icon: 'https://your-domain.com/icon.png', // Use your actual icon URL
            description: `${telegram_username} has requested ${amount} ${currency} from you.`,
            links: {
                actions: [
                    {
                        label: `Send ${amount} ${currency}`,
                        href: `/api/usdc?action=send&order_id=${orderId}`,
                    },
                    {
                        label: 'Reject Request',
                        href: `/api/usdc?action=reject&order_id=${orderId}`,
                    },
                ],
            },
        }

        return new Response(JSON.stringify(payload), {
            headers,
        })
    } catch (error) {
        console.error('Error in GET handler:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers,
        })
    }
}

// Function to fetch order data from your API
async function getOrderData(orderId: string) {
    const apiUrl = `https://squint-api.vercel.app/orders/${orderId}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data from API:', error)
        throw new Error('Failed to fetch order data.')
    }
}

export const OPTIONS = async () => {
    return new Response(null, { headers })
}
