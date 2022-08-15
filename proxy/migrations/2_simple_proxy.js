const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const SimpleProxy = artifacts.require('SimpleProxy');

module.exports = async function (deployer) {
  const instance = await deployProxy(SimpleProxy, [42], { deployer });
  console.log('Deployed', instance.address);

};
