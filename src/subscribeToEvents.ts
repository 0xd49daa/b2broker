import { Contract, ContractAbi } from 'web3';
import { getDecimals, scaleNumber } from './utils';

export default async function subscribeToEvents(
  contract: Contract<ContractAbi>
) {
  const decimals = await getDecimals(contract);
  const emitter = contract.events.Transfer();

  emitter.on('data', (event: any) => {
    const summary = event.returnValues;

    console.log(
      `Transfer of ${scaleNumber(summary.value, decimals)} USDT from ${
        summary.from
      } to ${summary.to} transactionHash ${event.transactionHash}`
    );
  });
  emitter.on('error', (err) => console.error(err));
}
