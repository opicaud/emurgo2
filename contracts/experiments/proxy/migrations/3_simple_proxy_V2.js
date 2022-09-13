const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const SimpleProxy = artifacts.require('SimpleProxy');
const SimpleProxyV2 = artifacts.require("SimpleProxyV2");

module.exports = async function (deployer) {
  const existing = await SimpleProxy.deployed();
  const instance = await upgradeProxy(existing.address, SimpleProxyV2, { deployer });
  console.log("Upgraded", instance.address);

};
