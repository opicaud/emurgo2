// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract WorkContract is PaymentSplitter {

  constructor(address[] memory payees, uint256[] memory shares_) PaymentSplitter(payees, shares_) payable {}

}
