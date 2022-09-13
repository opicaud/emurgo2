const CanBehaveDifferently = artifacts.require("CanBehaveDifferently");
const DoNothing = artifacts.require("DoNothing");

module.exports = async function (deployer) {
  await deployer.deploy(DoNothing);
  const instance = await DoNothing.deployed();
  await deployer.deploy(CanBehaveDifferently, instance.address);
};
