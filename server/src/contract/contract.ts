import Web3 from "web3"

const MyContract = require("./Charity.json")
const contractABI = MyContract.abi
const contractAddress = "0x68bABbbb6145315244E31945cc232e6f0c90f682"
const rpcEndpoint = "http://localhost:7545"

const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))
const contract = new web3.eth.Contract(contractABI, contractAddress)

export {contract, web3, contractAddress}