#! /usr/bin/env node
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const web3 = new Web3("https://ropsten.infura.io/v3/c63a0e3d817f4f249d013559f0f5c5ff");
const abi = [{"constant":true,"inputs":[],"name":"offer_id","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_conversion_id","type":"string"},{"name":"_affiliate","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_toAffiliate","type":"uint256"}],"name":"writeConversion","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_wallet","type":"address"}],"name":"getBalance","outputs":[{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokenContractAddress","type":"address"},{"name":"_offer_id","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"components":[{"name":"id","type":"string"},{"name":"timestamp","type":"uint256"},{"name":"affiliate","type":"address"},{"name":"amount","type":"uint256"},{"name":"toAffiliate","type":"uint256"}],"indexed":false,"name":"_conversion","type":"tuple"}],"name":"Conversion","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"uint256"}],"name":"Replenishment","type":"event"}];
const args = process.argv.slice(2);
const conversionId = args[0];
const affiliateAddress = args[1];
const amount = parseInt(args[2], 10);
const toAffiliate = parseInt(args[3], 10);
const contractAddress = args[4];
const nonce = parseInt(args[5], 10);
const ownerPK = "<YOUR PRIVATE KEY>";
const privateKey = new Buffer.from(ownerPK, 'hex');
var contract = new web3.eth.Contract(abi, contractAddress);
var transactionData = contract.methods.writeConversion(conversionId, affiliateAddress, amount, toAffiliate).encodeABI();
var rawTx = {
    to: contractAddress,
    nonce: web3.utils.toHex(nonce),
    gas: web3.utils.toHex(150000),
    gasPrice: web3.utils.toHex(10000000000),
    value: web3.utils.toHex(0),
    data: transactionData,
    chainId: web3.utils.toHex(3)
}
var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = tx.serialize();
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', console.log);