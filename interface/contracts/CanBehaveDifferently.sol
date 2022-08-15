// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IDoSomething.sol";
import "./DoNothing.sol";

contract CanBehaveDifferently {
    IDoSomething private doSomething;

    uint public something;
    uint public somethingElse;

    constructor(address _doSomething){
        setIDoSomethingImpl(_doSomethingI);
    }

    function behave() public {
        something = doSomething.doSomething();
        somethingElse = doSomething.doSomethingElse();
    }

    function setIDoSomethingImpl(address _doSomething) public {
        doSomething = IDoSomething(_doSomething);
    }

}
