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
} from '@solana/actions';
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
} from '@solana/web3.js';
import * as multisig from '../../../../../node_modules/@sqds/multisig/lib/index';
import AWS from 'aws-sdk';

const sqs = new AWS.SQS({ region: 'eu-central-1' });
const queueUrl =
  'https://sqs.eu-central-1.amazonaws.com/816069166828/action-builder-q';

const params: AWS.SQS.ReceiveMessageRequest = {
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 10,
  WaitTimeSeconds: 5,
};
let receivedPayload: any = null;

async function receiveMessages(): Promise<void> {
  try {
    const data: AWS.SQS.ReceiveMessageResult = await sqs
      .receiveMessage(params)
      .promise();

    // Check if messages were received
    if (data.Messages && data.Messages.length > 0) {
      console.log('Received messages:', data.Messages);

      // Process each message
      data.Messages.forEach((message) => {
        if (message.Body) {
          console.log('Message ID:', message.MessageId);
          console.log('Message Body:', message.Body);

          // Process the message here (e.g., parse it, store it in a DB, etc.)
          const payload = JSON.parse(message.Body);
          console.log('Payload:', payload);
          receivedPayload = payload.payload;

          // Optionally delete the message from the queue after processing
          if (message.ReceiptHandle) {
            const deleteParams: AWS.SQS.DeleteMessageRequest = {
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle,
            };

            sqs.deleteMessage(deleteParams, (err, deleteData) => {
              if (err) {
                console.error('Error deleting message', err);
              } else {
                console.log('Message deleted:', message.MessageId);
              }
            });
          }
        }
      });
    } else {
      console.log('No messages found.');
    }
  } catch (err) {
    console.error('Error receiving messages:', err);
  }
}

export const GET = async (req: Request) => {
  await receiveMessages();
  console.log(receivedPayload);
  const payload: ActionGetResponse = receivedPayload || {
    title: `something`,
    icon: 'https://ucarecdn.com/914284ad-6250-43a4-89dc-20e3d5a78c6e/-/preview/1000x1000/',
    description: `send money brokie`,
    label: 'squads',
    links: {
      actions: [
        {
          label: 'Send',
          href: `/api/actions/squad?address=&action=send&amount={sendAmount}&wallet={wallet}`,
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
  };
  return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
};
