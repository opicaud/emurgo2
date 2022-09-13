// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IDoSomething.sol";

contract DoNothing is IDoSomething {

  function doSomething() external pure returns (uint) {
    return 0;
  }
  function doSomethingElse() external pure returns (uint) {
    return 0;
  }
}
