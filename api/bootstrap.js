const TransDAO = artifacts.require("TransDAO");
const TimelockController = artifacts.require('TimelockController')
const TransDAOFunds = artifacts.require('TransDAOFunds')

async function need() {
    const accounts = await web3.eth.getAccounts()
    const token = await TransDAO.deployed();
    const amount = 100
    await token.mint(accounts[0], amount);
    await token.delegate(accounts[0]);
    console.log("delegate %s token minted for %s", amount, accounts[0])
}

async function transferEth() {
    const accounts = await web3.eth.getAccounts()
    const timelockController = await TimelockController.deployed()
    await timelockController.send(web3.utils.toWei('1','ether'));
    console.log("%s sending %s ETH to TimelockController", accounts[0], '1')

    const transDAOFunds = await TransDAOFunds.deployed()
    await transDAOFunds.send(web3.utils.toWei('1000','ether'));
    console.log("%s sending %s ETH to TransDAOFunds", accounts[0], '1000')

}

module.exports =  async function (callback) {
    await need();
    await transferEth();
    callback();

}
