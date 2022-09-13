const DoSomething = artifacts.require("DoSomething");

module.exports = function (deployer) {
  deployer.deploy(DoSomething);
};
