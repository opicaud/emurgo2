const DoSomethingElse = artifacts.require("DoSomethingElse");

module.exports = function (deployer) {
  deployer.deploy(DoSomethingElse);
};
