import { Contract, ContractAbi } from 'web3';
import { getDecimals, scaleNumber } from '../src/utils';

it('should scale bigint', () => {
  const num = scaleNumber(BigInt('12345678987654321'), BigInt(10));
  expect(num).toEqual(1234567.8987654321);
});

it('should get decimals', async () => {
  const decimalsMock = jest.fn().mockReturnValue(BigInt(2));

  const contractMock = {
    methods: {
      decimals: () => ({
        call: decimalsMock,
      }),
    },
  } as unknown as Contract<ContractAbi>;

  const result = await getDecimals(contractMock);

  expect(decimalsMock).toHaveBeenCalled();

  expect(result).toEqual(BigInt(2));
});
