// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Decision is PullPayment, Ownable {

  function transfer(address payee, uint256 amount) public payable onlyOwner{
    _asyncTransfer(payee, amount);
  }

  receive() external payable {}

  function dummy() external {}

}
