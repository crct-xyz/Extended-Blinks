import {
  BlockchainType,
    DappMessageActionType,
    Dialect,
    DialectCloudEnvironment,
    DialectSdk,
    Dapp
  } from '@dialectlabs/sdk';
  
  import {
    Solana,
    SolanaSdkFactory,
    NodeDialectSolanaWalletAdapter
  } from '@dialectlabs/blockchain-sdk-solana';
  
  const environment: DialectCloudEnvironment = 'production';
  console.log("hello")
  
  const sdk: DialectSdk<Solana> = Dialect.sdk(
    {
      environment,
    },
    SolanaSdkFactory.create({
      // IMPORTANT: must set environment variable DIALECT_SDK_CREDENTIALS
      // to your dapp's Solana keypair e.g. [170,23, . . . ,300]
      wallet: NodeDialectSolanaWalletAdapter.create(),
    }),
  );
  console.log("hello")
  // const dapp =  await sdk.dapps.create({
  //   name: "test Dapp",
  //   description: "description",
  //   blockchainType: BlockchainType.SOLANA
  // });
  const dapp: Dapp = await sdk.dapps.find();

  // to send messages to all users
  await dapp.messages.send({
    title: "test2",
    message: "hi"
  })