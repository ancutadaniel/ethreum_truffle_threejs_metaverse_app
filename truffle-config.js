require('dotenv').config({ path: './.env' });

const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || '';

// console.log(process.env);

module.exports = {
  contracts_directory: './src/contracts',
  contracts_build_directory: './src/build/abi',

  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      // port: 8545, // port used for Ganache CLI
      network_id: '*', // Match any network id
    },
    developmentGanacheCLI: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://kovan.infura.io/v3/${process.env.PROJECT_ID}` // Url to an Ethereum Node
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 42,
    },
    main: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://main.infura.io/v3/${process.env.PROJECT_ID}` // Url to an Ethereum Node
        );
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 1,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `wss://ropsten.infura.io/ws/v3/${process.env.PROJECT_ID}`
        ),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://rinkeby.infura.io/v3/${process.env.PROJECT_ID}`
        ),
      network_id: 4,
      gas: 5500000,
    },
  },

  compilers: {
    solc: {
      version: '0.8.13',
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
};
