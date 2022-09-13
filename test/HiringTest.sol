// SPDX-License-Identifier: MIT

pragma solidity >=0.4.25 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Hiring.sol";
import "./TransDAOMock.sol";


contract TestHiring {
    uint public initialBalance = 5 ether;

    function testShouldAddAMember () public {
        ERC20 token = new TransDAOMock();
        Hiring hiring = new Hiring(address (token));
        token.transfer(address (hiring), 1 ether);
        Assert.equal(token.balanceOf(address(hiring)), 1 ether, "");
        Address.sendValue(payable(address(hiring)), 2 ether);

        Assert.equal(hiring.isMember(address (this)),false, "");


        hiring.hire(address(this));

        Assert.equal(hiring.isMember(address (this)),true, "");
        Assert.equal(address (this).balance, 4 ether, "");
        Assert.equal(token.balanceOf(address(this)), 5 ether, "");

    }

    receive() external payable virtual {}


}
