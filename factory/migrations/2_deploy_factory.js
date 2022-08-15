const Factory = artifacts.require("Factory");
const Organisation = artifacts.require("Organisation");

module.exports = function (deployer) {
  deployer.deploy(Factory);
  deployer.deploy(Organisation)
};
