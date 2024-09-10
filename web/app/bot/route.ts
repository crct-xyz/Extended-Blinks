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
  clusterApiUrl,
  Authorized,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  TransactionMessage,
  LAMPORTS_PER_SOL,
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  VersionedMessage,
  VersionedTransaction,
} from '@solana/web3.js';
//@ts-ignore
import * as multisig from '@sqds/multisig';
import { Bot, InlineKeyboard } from 'grammy';
import { metadata } from '../layout';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot('7216921050:AAEISmruLCEXGap4zLcpDyzGyLKWTIBq2SU', {
  polling: true,
});
const subscribers = new Set<number>();
const connection = new Connection(clusterApiUrl('mainnet-beta'));

function sendTelegramMessage(message: string): void {
  subscribers.forEach((chatId) => {
    bot.sendMessage(chatId, message);
  });
}

async function checkTransactions(): Promise<void> {
  const multisigPda = new PublicKey(
    'Gr5FaqkMmypxUJfADQsoYN3moknprc5LzMF2qh3SiP8m'
  );
  let lastCheckedSignature: string | undefined;

  while (true) {
    const signatures = await connection.getSignaturesForAddress(multisigPda, {
      limit: 5,
    });
    for (const sigInfo of signatures) {
      if (sigInfo.signature === lastCheckedSignature) {
        break;
      }
      if (sigInfo.confirmationStatus === 'finalized') {
        const message = `new transaction detected: \nSignature: ${sigInfo.signature}\nSlot: ${sigInfo.slot}\nVote for the transaction here: https://dial.to/?action=solana-action%3Ahttp://localhost:3000/api/actions/squad/vote?address=${multisigPda}`;
        sendTelegramMessage(message);
        lastCheckedSignature = sigInfo.signature;
        break;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 20000));
  }
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  subscribers.add(chatId);
  console.log(subscribers);
  bot.sendMessage(
    chatId,
    'Bot started. You will receive notifications for new transactions.'
  );
});

// Stop command handler
bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  subscribers.delete(chatId);
  bot.sendMessage(
    chatId,
    'Notifications stopped. You will no longer receive updates.'
  );
});

// Main function
async function main() {
  console.log('Bot is running...');
  console.log(subscribers);
  await checkTransactions();
}

main().catch(console.error);
