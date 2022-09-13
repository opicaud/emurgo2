// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Hiring is Ownable {

  mapping(address => bool) private members;
  ERC20 private token ;

  constructor(address _token){
    token = ERC20(_token);
  }

  function hire(address newMember) external onlyOwner{
    require(newMember != address (0));
    Address.sendValue(payable(newMember), 1 ether);
    token.transfer(newMember, 1 ether);
    members[newMember] = true;
  }

  function isMember(address member) external view returns (bool) {
    return members[member];
  }

  receive() external payable virtual {}

}
