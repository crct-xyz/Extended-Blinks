import axios from 'axios';

const circleApiKey = 'TEST_API_KEY:574ecb5bfd0f3e067e7a33e2739f3a41:d3611124dc3204d65b0b61ba98fb3608'
const circleApiUrl = 'https://api-sandbox.circle.com/v1/wallets';


async function createWallet() {
    try {
      const response = await axios.post(circleApiUrl, {}, {
        headers: {
          'Authorization': `Bearer ${circleApiKey}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('New Wallet Created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  }

createWallet();
