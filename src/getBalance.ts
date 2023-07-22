import { Contract, ContractAbi } from 'web3';
import { getDecimals, scaleNumber } from './utils';

export default async function getBalance(
  contract: Contract<ContractAbi>,
  addr: string
) {
  const balancePromise = contract.methods
    .balanceOf(
      // @ts-ignore
      addr
    )
    .call() as Promise<bigint>;

  const [balance, decimals] = await Promise.all([
    balancePromise,
    getDecimals(contract),
  ]);

  return scaleNumber(balance, decimals);
}
