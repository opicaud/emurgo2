const TransDAOFunds = artifacts.require("TransDAOFunds");
const TimelockController = artifacts.require("TimelockController")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(TransDAOFunds, TimelockController.address, 1641497833, 31536000)
};
