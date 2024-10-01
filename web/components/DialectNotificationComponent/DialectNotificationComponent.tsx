'use client';

import '@dialectlabs/react-ui/index.css';

import { DialectSolanaSdk } from '@dialectlabs/react-sdk-blockchain-solana';
import { NotificationsButton } from '@dialectlabs/react-ui';

/* Set DAPP_ADDRESS variable to the public key generated in previous section */
const DAPP_ADDRESS = 'HHGEoML1o4yTSNiQTJNrSzub9ci4AE91ioWMpWsQ1moo';

export const DialectNotificationComponent = () => {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton />
    </DialectSolanaSdk>
  );
};