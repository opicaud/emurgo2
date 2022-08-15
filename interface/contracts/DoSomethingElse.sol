// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IDoSomething.sol";

contract DoSomethingElse is IDoSomething {

  function doSomething() external pure returns (uint) {
    return 100;
  }
  function doSomethingElse() external pure returns (uint) {
    return 1000;
  }
}
