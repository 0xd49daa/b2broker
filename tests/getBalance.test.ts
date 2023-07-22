import { Contract, ContractAbi } from 'web3';
import getBalance from '../src/getBalance';

it('should get the balance', async () => {
  const ETH_ADDRESS = 'ETH_ADDRESS';
  const balanceOfMock = jest.fn().mockReturnValue(BigInt(1000));
  const decimalsMock = jest.fn().mockReturnValue(BigInt(2));

  const contractMock = {
    methods: {
      balanceOf: jest.fn(() => ({
        call: balanceOfMock,
      })),
      decimals: () => ({
        call: decimalsMock,
      }),
    },
  };

  const balance = await getBalance(
    contractMock as unknown as Contract<ContractAbi>,
    ETH_ADDRESS
  );

  expect(contractMock.methods.balanceOf).toHaveBeenCalledWith(ETH_ADDRESS);
  expect(balanceOfMock).toHaveBeenCalled();
  expect(decimalsMock).toHaveBeenCalled();

  expect(balance).toEqual(10);
});
