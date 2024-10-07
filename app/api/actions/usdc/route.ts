import { createActionHeaders, ActionGetResponse
  createPostResponse,
  ActionPostRequest,
  ActionPostResponse,
} from '@solana/actions'

import { NextRequest } from 'next/server'
import { PublicKey, Transaction, Connection, clusterApiUrl } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
} from '@solana/spl-token';

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


//gpt POST Starter
export const POST = async (req: NextRequest) => {
  try {
    const body: ActionPostRequest = await req.json();
    const { account } = body;

    // Extract action and order_id from query parameters
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const orderId = searchParams.get('order_id');

    if (!action || !orderId) {
      throw new Error('Missing required parameters.');
    }

    // Fetch order data
    const orderData = await getOrderData(orderId);

    if (!orderData) {
      throw new Error('Order not found.');
    }

    const {
      action_event: {
        event_type,
        details: { telegram_username, amount, currency },
      },
    } = orderData;

    let payload: ActionPostResponse;

    if (action === 'send') {
      // Process sending USDC
      const decimals = 6;
      const tokenAmount = BigInt(Math.round(Number(amount) * 10 ** decimals));

      const mintAddress = new PublicKey('Es9vMFrzaCERWL6f3d7hQY64Eh9DFeCEedZbT4kCM6M'); // USDC Mainnet

      const connection = new Connection(clusterApiUrl('mainnet-beta'));

      const transaction = new Transaction();

      const senderPublicKey = new PublicKey(account);

      // Map the `telegram_username` to a Solana public key
      const recipientPublicKey = await getPublicKeyFromTelegramUsername(telegram_username);
      if (!recipientPublicKey) {
        throw new Error('Could not find recipient\'s public key.');
      }

      const senderTokenAddress = await getAssociatedTokenAddress(
        mintAddress,
        senderPublicKey
      );
      const recipientTokenAddress = await getAssociatedTokenAddress(
        mintAddress,
        recipientPublicKey
      );

      // Check if recipient's token account exists
      const recipientTokenAccountInfo = await connection.getAccountInfo(
        recipientTokenAddress
      );

      if (!recipientTokenAccountInfo) {
        // Create recipient's token account
        const createATAInstruction = createAssociatedTokenAccountInstruction(
          senderPublicKey,
          recipientTokenAddress,
          recipientPublicKey,
          mintAddress
        );
        transaction.add(createATAInstruction);
      }

      // Add transfer instruction
      const transferInstruction = createTransferCheckedInstruction(
        senderTokenAddress,
        mintAddress,
        recipientTokenAddress,
        senderPublicKey,
        tokenAmount,
        decimals
      );
      transaction.add(transferInstruction);

      // Serialize transaction
      const serializedTransaction = transaction.serialize({
        verifySignatures: false,
        requireAllSignatures: false,
      });
      const transactionBase64 = serializedTransaction.toString('base64');

      payload = await createPostResponse({
        fields: {
          transaction: transactionBase64,
          message: `Sending ${amount} ${currency} to ${telegram_username}`,
        },
      });
    } else if (action === 'reject') {
      // Handle rejection
      payload = await createPostResponse({
        fields: {
          message: 'You have rejected the payment request.',
        },
      });
    } else {
      throw new Error('Invalid action.');
    }

    return new Response(JSON.stringify(payload), { headers });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers,
    });
  }
};

// Function to fetch order data from your API
async function getOrderData(orderId: string) {
  const apiUrl = `https://your-api-endpoint.com/orders/${orderId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw new Error('Failed to fetch order data.');
  }
}

// Function to map telegram_username to Solana public key
async function getPublicKeyFromTelegramUsername(username: string): Promise<PublicKey | null> {
  // Implement the logic to map the Telegram username to a Solana public key
  // This might involve querying your API or database
  // For example:
  const apiUrl = `https://your-api-endpoint.com/users/telegram/${username}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Failed to fetch public key for ${username}`);
      return null;
    }
    const data = await response.json();
    const publicKeyString = data.publicKey; // Adjust based on your API response

    return new PublicKey(publicKeyString);
  } catch (error) {
    console.error('Error fetching public key from API:', error);
    return null;
  }
}
