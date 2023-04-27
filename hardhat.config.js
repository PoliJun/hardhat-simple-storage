require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
    // default network is hardhat network
    // you can use: --network to specify the network when run deploy.js
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY], // this should be accounts rather than account!
            chainId: 5,
        },
    },
    solidity: "0.8.18",
    etherscan: {
        apiKey: {// this is apiKey rather than apikey, bugged here
            goerli: ETHERSCAN_API_KEY,
        },
    },
}

// there is a lot of plugins on hardhat
