import { mockConsoleLog } from 'jest-mock-process';
import { Contract, ContractAbi } from 'web3';
import subscribeToEvents from '../src/subscribeToEvents';
import { EventEmitter } from 'stream';

it('should subscribe to events', async () => {
  const decimalsMock = jest.fn().mockReturnValue(BigInt(2));
  const emitter = new EventEmitter();

  const contractMock = {
    methods: {
      decimals: () => ({
        call: decimalsMock,
      }),
    },
    events: {
      Transfer: () => {
        return emitter;
      },
    },
  } as unknown as Contract<ContractAbi>;

  const mockLog = mockConsoleLog();

  await subscribeToEvents(contractMock);

  emitter.emit('data', {
    transactionHash:
      '0xd64487af578659e6e37e504094b06b024b9d1f1d6e52d362928fd8f6d55986ff',
    returnValues: {
      from: '0x2043aAaBa402dbf018f8579575DBa8eBcCc6cEAb',
      to: '0x99a58482bd75cbab83b27ec03ca68ff489b5788f',
      value: BigInt('799918708'),
    },
  });

  expect(decimalsMock).toHaveBeenCalled();

  expect(mockLog).toHaveBeenNthCalledWith(
    1,
    'Transfer of 7999187.08 USDT from 0x2043aAaBa402dbf018f8579575DBa8eBcCc6cEAb to 0x99a58482bd75cbab83b27ec03ca68ff489b5788f transactionHash 0xd64487af578659e6e37e504094b06b024b9d1f1d6e52d362928fd8f6d55986ff'
  );

  mockLog.mockRestore();
});
