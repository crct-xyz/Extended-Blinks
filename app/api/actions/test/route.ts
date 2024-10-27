import {
    createActionHeaders,
    NextActionPostRequest,
    ActionError,
    CompletedAction,
    ACTIONS_CORS_HEADERS,
    ActionGetRequest,
    ActionGetResponse,
    ActionPostRequest,
    ActionPostResponse,
    createPostResponse,
} from '@solana/actions'
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
} from '@solana/web3.js'
import * as multisig from '@sqds/multisig'
import AWS from 'aws-sdk'
import axios from 'axios'

const sqs = new AWS.SQS({ region: 'eu-central-1' })
const queueUrl =
    'https://sqs.eu-central-1.amazonaws.com/816069166828/action-builder-q'
const notificationQueueUrl =
    'https://sqs.eu-central-1.amazonaws.com/816069166828/NotificationQueue'
const dbUrl =
    'http://ec2-52-59-228-70.eu-central-1.compute.amazonaws.com:8000/telegram/'
// const response = await axios.get(dbUrl);
// const telegram_user = response.data.telegram_user

const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
}
let receivedPayload: any = null

const sendData = {
    blinkUrl: 'http://localhost:3000/api/actions/test',
    telegram_user: 'aarsho',
}

async function sendToSQS() {
    const sendParams = {
        MessageBody: JSON.stringify({ sendData }),
        QueueUrl: notificationQueueUrl,
    }

    try {
        const result = await sqs.sendMessage(sendParams).promise()
        console.log('Message sent to SQS:', result)
    } catch (error) {
        console.error('Error sending message to SQS:', error)
    }
}

async function receiveMessages(): Promise<void> {
    try {
        const data: AWS.SQS.ReceiveMessageResult = await sqs
            .receiveMessage(params)
            .promise()

        // Check if messages were received
        if (data.Messages && data.Messages.length > 0) {
            console.log('Received messages:', data.Messages)

            // Process each message
            data.Messages.forEach((message) => {
                if (message.Body) {
                    console.log('Message ID:', message.MessageId)
                    console.log('Message Body:', message.Body)

                    // Process the message here (e.g., parse it, store it in a DB, etc.)
                    const parsedBody = JSON.parse(message.Body)
                    console.log('Payload:', parsedBody)
                    receivedPayload = parsedBody.payload

                    // Optionally delete the message from the queue after processing
                    if (message.ReceiptHandle) {
                        const deleteParams: AWS.SQS.DeleteMessageRequest = {
                            QueueUrl: queueUrl,
                            ReceiptHandle: message.ReceiptHandle,
                        }

                        sqs.deleteMessage(deleteParams, (err, deleteData) => {
                            if (err) {
                                console.error('Error deleting message', err)
                            } else {
                                console.log(
                                    'Message deleted:',
                                    message.MessageId
                                )
                            }
                        })
                    }
                }
            })
        } else {
            console.log('No messages found.')
        }
    } catch (err) {
        console.error('Error receiving messages:', err)
    }
}

export const GET = async (req: Request) => {
    await receiveMessages()
    // await sendToSQS();
    console.log(receivedPayload)
    const payload: ActionGetResponse = receivedPayload || {
        title: `something`,
        icon: 'https://ucarecdn.com/914284ad-6250-43a4-89dc-20e3d5a78c6e/-/preview/1000x1000/',
        description: `send money brokie`,
        label: 'squads',
        links: {
            actions: [
                {
                    label: 'Send',
                    href: `/api/actions/squad?address=Gr5FaqkMmypxUJfADQsoYN3moknprc5LzMF2qh3SiP8m&action=send&amount={sendAmount}&wallet={wallet}`,
                    parameters: [
                        {
                            name: 'sendAmount',
                            label: 'Amount',
                            required: true,
                        },
                        {
                            name: 'wallet',
                            label: 'Wallet Address of Recipient',
                            required: true,
                        },
                    ],
                },
            ],
        },
    }
    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS })
}
