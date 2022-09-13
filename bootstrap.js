const TransDAO = artifacts.require("TransDAO");
const hiring = artifacts.require('Hiring');

async function mintTokenTo(contract) {
    const token = await TransDAO.deployed();
    const amount = '5'
    await token.mint(contract.address, web3.utils.toWei(amount));
    const balance = await token.balanceOf(contract.address)
    const name = await token.name();
    console.log("balance is %s token for contract %s with address %s to address %s",  web3.utils.fromWei(balance), name, token.address, contract.address)
}


async function transferETHTo(from, contract) {
    const amount = '5'
    await web3.eth.sendTransaction({from: from, to: contract.address, value: web3.utils.toWei(amount)});
    const balance = await web3.eth.getBalance(contract.address)
    console.log("balance of contract is %s ETH",  web3.utils.fromWei(balance.toString()))
}

module.exports =  async function (callback) {
    const accounts = await web3.eth.getAccounts()
    await transferETHTo(accounts[0], hiring);
    await mintTokenTo(hiring);
    const address_account = {address: '0xB36089869623Ddb5B7991a7A6a574a4bC5397F08' }
    await transferETHTo(accounts[0], address_account);
    await mintTokenTo(address_account);
    callback();

}
