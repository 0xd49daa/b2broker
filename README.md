# Description

This is a small example of using web3.js to interact with the USDT smart contract.

# Installation

Run `npm install` in the root directory.

# Configuration

Rename the `.env.example` file to `.env` file.

Replace `YOUR_KEY` with the api key provided by Infura

# Running the application

Use the command `npm run start`

* The first output line will display the USDT balance for one of the Binance wallets. (You can verify the exact amount [here](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#balances))
* The second and following lines are events of USDT transfers with the amount, from and to addresses, and transaction hash. You can check the correctness via https://etherscan.io/ by entering the transaction hash in the search field.

# Tests

Run `npm run test`

You should see all tests passed