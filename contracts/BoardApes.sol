// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title Minter
 * @author Jason Hedman
 * @notice This contract handles minting Board Apes ERC721 tokens.
 */
contract BoardApes is ERC721A, ReentrancyGuard, Ownable, Pausable {

    using ECDSA for bytes32;
    using Strings for uint256;

    string public baseTokenURI;
    uint256 public price = 0.08 ether;
    uint256 public immutable maxSupply = 1500;
    
    uint256 public maxMintQuantity = 10;

    uint256 public immutable publicMintMax = 1000;
    uint256 public publicMintCounter = 0;

    mapping(uint256 => bool) private affeRedeemed;

    /**
     * @notice Construct a Board Apes instance
     * @param baseTokenURI_ Base URI for all tokens
     */
    constructor(
        string memory baseTokenURI_
    ) ERC721A("Board Apes", "BA") {
        baseTokenURI = baseTokenURI_;
    }

    bool public isPublicSaleActive = false;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setSaleState(bool _saleActiveState) public onlyOwner {
        require(isPublicSaleActive != _saleActiveState, "NEW_STATE_IDENTICAL_TO_OLD_STATE");
        isPublicSaleActive = _saleActiveState;
    }

    /**
     * Returns all the token ids owned by a given address
     */
    function ownedTokensByAddress(address owner) external view returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](balanceOf(owner));
        uint256 index = 0;
        for (uint256 i = 0; i < totalSupply(); i++) {
            if(ownerOf(i) == owner)
                tokenIds[index++] = i;
        }
        return tokenIds;
    }

    /**
     * Update the base token URI
     */
    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 mintQuantity) external payable virtual nonReentrant {
        require(isPublicSaleActive, "SALE_IS_NOT_ACTIVE");
        require(mintQuantity > 0 && mintQuantity <= maxMintQuantity, "INVALID_MINT_QUANTITY");
        require(msg.value >= ((price * mintQuantity) - 0.0001 ether) && msg.value <= ((price * mintQuantity) + 0.0001 ether), "INVALID_PRICE");

        require(publicMintCounter + mintQuantity <= publicMintMax, "NOT_ENOUGH_PUBLIC_MINTS");
        
        uint256 currentSupply = totalSupply();
        require(currentSupply + mintQuantity <= maxSupply, "NOT_ENOUGH_MINTS_AVAILABLE");

        _safeMint(msg.sender, mintQuantity);
        publicMintCounter += mintQuantity;

        if (currentSupply + mintQuantity == maxSupply) {
            isPublicSaleActive = false;
        }
    }

    function affenMint(uint256[] calldata _tokenIds) external payable virtual nonReentrant {
        for(uint256 i = 0; i < _tokenIds.length; i++) {
            require(!affeRedeemed[_tokenIds[i]], "Affe already redeemed");
            affeRedeemed[_tokenIds[i]] = true;
        }
        _safeMint(msg.sender, _tokenIds.length * 2);
    }

    /**
     * @notice Allow contract owner to withdraw funds to its own account.
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}