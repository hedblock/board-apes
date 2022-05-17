// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './BoardApes.sol';

contract BoardApesTest is BoardApes {
    constructor(
        string memory baseTokenURI_
    ) BoardApes("aaa") {}

    function checkRedeemTest(uint256[] calldata _tokenIds, address ownerId) public {
        checkRedeem(_tokenIds, ownerId);
    }
}