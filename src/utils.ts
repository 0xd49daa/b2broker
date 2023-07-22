import { Contract, ContractAbi } from 'web3';

export async function getDecimals(contract: Contract<ContractAbi>) {
  return (await contract.methods.decimals().call()) as bigint;
}

export function scaleNumber(original: bigint, decimals: bigint): number {
  const factor = BigInt(10) ** decimals;
  const fractionFactor = 10 ** Number(-decimals);
  const fraction = Number(original % factor);

  return Number(original / factor) + fraction * fractionFactor;
}
