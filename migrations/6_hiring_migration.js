const Hiring = artifacts.require("Hiring");
const TimelockController = artifacts.require("TimelockController")
const TransDAO = artifacts.require("TransDAO")

module.exports = async function (deployer) {
  await deployer.deploy(Hiring, TransDAO.address);
  const instance = await Hiring.deployed();
  const timelock = await TimelockController.deployed();
  await instance.transferOwnership(timelock.address);

};
