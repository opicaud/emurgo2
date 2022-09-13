// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SimpleProxy is Initializable, UUPSUpgradeable, OwnableUpgradeable{

  uint public something;

  function initialize(uint _something) initializer public {
    something = _something;
    __Ownable_init();
  }
  function _authorizeUpgrade(address) internal override onlyOwner {}

}
