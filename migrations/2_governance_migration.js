const TransDAO = artifacts.require("TransDAO");
const TransDAOGovernor = artifacts.require("TransDAOGovernor");
const TimelockController = artifacts.require("TimelockController")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(TransDAO)
  await deployer.deploy(TimelockController, 5, accounts,accounts)
  await deployer.deploy(TransDAOGovernor, TransDAO.address, TimelockController.address)
  const timelock = await TimelockController.deployed();
  const governance = await TransDAOGovernor.deployed();
  await timelock.grantRole(web3.utils.keccak256("PROPOSER_ROLE"), governance.address);
  await timelock.grantRole(web3.utils.keccak256("EXECUTOR_ROLE"), governance.address);


};
