const WorkContract = artifacts.require("WorkContract");

module.exports = async function (deployer, network, accounts) {
  const shares = [80, 10, 5];
  const userAddress = [accounts[0], accounts[1], accounts[2]];
  deployer.deploy(WorkContract, userAddress, shares);
};
