#! /usr/bin/env node
const Web3 = require('web3');
const web3 = new Web3("https://ropsten.infura.io/XA57VfrfNYg3DJMJ3auK");
const args = process.argv.slice(2);
const address = args[0];
web3.eth.getBalance(address, "latest", function(error, data) {
    console.log(web3.utils.fromWei(data))
});