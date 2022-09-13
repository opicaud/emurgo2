const Decision = artifacts.require("Decision");
const TimelockController = artifacts.require("TimelockController")

module.exports = async function (deployer) {
  await deployer.deploy(Decision);
  const instance = await Decision.deployed();
  const timelock = await TimelockController.deployed();
  await instance.transferOwnership(timelock.address);

};
