// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Governance.sol";
import "./Team.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract Organisation {
  mapping(string => address) public registry;
  string[] private contracts;

  Team private team;
  Governance private gov;

  constructor() public {
    team = new Team();
    gov = new Governance();
  }

  function start() external {
    address cloneTeam = Clones.clone(address(team));
    address cloneGov = Clones.clone(address(gov));
    Governance(cloneGov).initialize(cloneTeam);
    contracts.push('Governance');
    contracts.push('Team');
    registry['Governance'] = address(cloneGov);
    registry['Team'] = address(cloneTeam);

  }

  function getContracts() external view returns(string[] memory) {
    return contracts;
  }
}
