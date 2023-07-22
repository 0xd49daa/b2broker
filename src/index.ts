import 'dotenv/config';
import Web3, { Web3BaseProvider, type ContractAbi } from 'web3';
import getBalance from './getBalance';
import subscribeToEvents from './subscribeToEvents';

import Abi from './abi.json';

const CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const BINANCE_WALLET = '0xF977814e90dA44bFA03b6295A0616a897441aceC';

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    process.env.PROVIDER_URL! + process.env.API_KEY!
  )
);

async function init() {
  try {
    const contract = new web3.eth.Contract(
      Abi as ContractAbi,
      CONTRACT_ADDRESS
    );

    const balance = await getBalance(contract, BINANCE_WALLET);

    console.log(`Balance for wallet ${BINANCE_WALLET} is ${balance} USDT`);

    await subscribeToEvents(contract);
  } catch (e: any) {
    console.error(e.message);
  }
}

function shutdown(provider?: Web3BaseProvider) {
  return () => {
    console.info('Shutdown...');
    provider?.disconnect();
    process.exit(0);
  };
}

process
  .on('SIGINT', shutdown(web3.currentProvider))
  .on('SIGTERM', shutdown(web3.currentProvider))
  .on('SIGQUIT', shutdown(web3.currentProvider));

init();
