#! /usr/bin/env node
const Web3 = require('web3');
const web3 = new Web3("https://ropsten.infura.io/v3/c63a0e3d817f4f249d013559f0f5c5ff");
const args = process.argv.slice(2);
const tx = args[0];
web3.eth.getTransaction(tx, function(error, data) {
    console.log(JSON.stringify(data));
})