onst fs = require("fs");
var shell = require('shelljs');

Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const address = "0xa86aa8a6f0f9e73c7800a55e99bc8869c9355159";
var startBalance = '';
var payment = '';

console.log(address);
console.log(web3.version);
console.log(web3.eth.blockNumber);

  web3.eth.getBalance(address, function(error, result){
      if(!error) {
          balance = result;
          startBalance = web3.fromWei(balance, "ether");
          console.log(new Date() + `: Balance [${address}]: ${startBalance}`);
      } else
          console.error(error);
  });

var filter = web3.eth.filter('latest');

filter.watch((err, res) => {
  if (err) {
    console.log(`Watch error: ${err}`);
  } else {
    // Update balance
    web3.eth.getBalance(address, (err, bal) => {
      if (err) {
        console.log(`getBalance error: ${err}`);
      } else {
        balance = web3.fromWei(bal, "ether");
        console.log(new Date() + `: Balance [${address}]: ${balance}`);
  
  if (balance > startBalance) {
    console.log('flash LED');
    shell.exec('./flashled.sh');
    startBalance = balance;
        }
      }
    });
  }
});
