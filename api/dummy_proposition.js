var assert = require('assert');
var faker = require('@faker-js/faker').faker

const TransDAO = artifacts.require("TransDAO");
const TransDAOGovernor = artifacts.require("TransDAOGovernor")
const Decision = artifacts.require('Decision')
const TimelockController = artifacts.require('TimelockController')
const TransDAOFunds = artifacts.require("TransDaoFunds")
const WorkContract = artifacts.require("WorkContract")

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wairForLegalDelay(number) {
    const timelock = await TimelockController.deployed()
    let minDelay = await timelock.getMinDelay();
    console.log("Wait for the legal of %ss delay before execution..", minDelay)
    await timeout(minDelay * 1000);
    console.log("Voted Proposition %s is executing..", number)
}

async function generateADecision() {
    const decision = await Decision.deployed();
    const transDAOFunds = await TransDAOFunds.deployed();
    const amount = web3.utils.toWei('5', 'ether')
    const fee = web3.utils.toWei('1', 'ether')
    const workContract = await WorkContract.deployed();

    const calldatas0 = transDAOFunds.contract.methods.release(BigInt(amount)+BigInt(fee)).encodeABI()
    const calldatas1 = decision.contract.methods.transfer(workContract.address, BigInt(amount)).encodeABI();
    const calldatas2 = decision.contract.methods.withdrawPayments(workContract.address).encodeABI();

    let governance = await TransDAOGovernor.deployed();
    const number = "#" + faker.random.numeric(3)
    const title = number + ": " + faker.name.firstName() + " wants to payed 5 ETH";
    console.log("Proposal %s", title)

    await governance.propose(
        [transDAOFunds.address, decision.address, decision.address],
        [0, BigInt(amount), 0],
        [calldatas0, calldatas1, calldatas2], title)

    return number
}

async function currentBlock() {
    return await web3.eth.getBlockNumber()
}

async function vote(account, id, voteType){
    const token = await TransDAO.deployed();
    const governance = await TransDAOGovernor.deployed();

    await governance.castVote(id, voteType,{from: account} )
    const balance = await token.balanceOf(account)
    console.log("%s voted 'For' with %s token", account, balance)

}

async function queue(id){
    const governance = await TransDAOGovernor.deployed();

    await governance.queue(id)
    const status = await governance.state(id)
    assert(status == 5)
}

async function execute(id){
    const governance = await TransDAOGovernor.deployed();
    await governance.execute(id)
    const status = await governance.state(id)
    assert(status == 7)
}

async function movePropositionFromPendingToActive(id){
    await moveFromTo(id, 0, 1)
}

async function movePropositionFromActiveToSucceded(id){
    await moveFromTo(id, 1, 4)
}

async function moveFromTo(id , from, to){
    const governance = await TransDAOGovernor.deployed();
    const decision = await Decision.deployed();

    let status = await governance.state(id)
    assert(status == from)
    while(status.toNumber() !== to){
        await decision.dummy();
        status = await governance.state(id)
    }
}


module.exports =  async function (callback) {
    let accounts = await web3.eth.getAccounts()
    let governance = await TransDAOGovernor.deployed();
    const workCOntract = await WorkContract.deployed()

    const blockvote =  await currentBlock();
    const number = await generateADecision();
    const events = await governance.getPastEvents('ProposalCreated');
    const id = events[0].returnValues.proposalId
    const voteNeeded = await governance.quorum(blockvote.toString());
    console.log("Proposal need at least %s token to pass, and a majority", voteNeeded)

    await movePropositionFromPendingToActive(id)

    await vote(accounts[0], id,1)
    await vote(accounts[1], id,1)

   await movePropositionFromActiveToSucceded(id)
    console.log("Proposition %s voted..", number)
    await queue(id)
    await wairForLegalDelay(number);
    await execute(id)

    const balance = await web3.eth.getBalance(workCOntract.address)
    console.log("Balance of WorkContract: %s ETH", web3.utils.fromWei(balance,'ether'))

    //await workCOntract.release(accounts[0])
    callback();

}
