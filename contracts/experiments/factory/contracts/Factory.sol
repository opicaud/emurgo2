// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Organisation.sol";

contract Factory {
  mapping(string => address) public organisations;
  Organisation private organisation;

  constructor() public {
    organisation = new Organisation();
  }

  function create(string memory name) external {
    address cloneOrganisation = Clones.clone(address(organisation));
    organisations[name] = address(cloneOrganisation);
  }
}
