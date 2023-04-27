// imports
const { error } = require("console")
const { ethers, run, network } = require("hardhat")
require("dotenv").config()

//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    // where is the private key
    // where is the rpc url
    console.log(`Deployed contract ${simpleStorage.address}`)
    // what happens when we deploy the contract to hardhat network
    // console.log(network.config)

    // 4==4 -> true
    // 4=="4"->true
    // 4==="4"->false

    // if process.env.ETHERSCAN_API_KEY exists then it's true, otherwise it's false
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Wainting for block txes...")
        await simpleStorage.deployTransaction.wait(6) // wait for at most 6 blocks in case of waiting for blocks behind to complete
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`current value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

// verify
async function verify(contractAddress, args) {
    console.log("Verifying contract ... ")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
