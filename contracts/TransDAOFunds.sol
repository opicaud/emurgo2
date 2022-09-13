// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract TransDAOFunds is VestingWallet {
  constructor(address beneficiaryAddress, uint64 startTimestamp, uint64 durationSeconds)
    VestingWallet (beneficiaryAddress,startTimestamp,durationSeconds){}

  function release(uint256 amount) public virtual{
    emit EtherReleased(amount);
    Address.sendValue(payable(beneficiary()), amount);
  }

}
