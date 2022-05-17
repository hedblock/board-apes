// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

/// @title Board Apes NFT Collection
/// @author Jason Hedman
/// @notice An ERC721A implementation which gives free mint access to Affe mit Waffe token holders.
contract BoardApes is ERC721A, ReentrancyGuard, Ownable, Pausable {

    using ECDSA for bytes32;
    using Strings for uint256;

    string private baseTokenURI;
    uint256 public price = 0.08 ether;
    uint256 public immutable maxSupply = 1500;

    bool public isPublicSaleActive = false;
    uint256 public immutable publicMintMax = 1000;
    uint256 public publicMintCounter = 0;
    uint256 public maxMintQuantity = 10;

    uint256[250] public affeIds;
    mapping(uint256 => bool) public affeRedeemed;
    
    IERC1155 openseaContract = IERC1155(0x495f947276749Ce646f68AC8c248420045cb7b5e);

    /**
     * @notice Construct a Board Apes instance
     * @param baseTokenURI_ Base URI for all tokens
     */
    constructor(
        string memory baseTokenURI_
    ) ERC721A("Board Apes", "BA") {
        baseTokenURI = baseTokenURI_;
    }

    /// @notice get token URI for given token ID
    /// @param _tokenId Token ID
    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(_baseURI(), _tokenId.toString(), ".json"));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @notice sets the base URI for all tokens
    /// @param _newBaseURI new base URI
    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    /// @notice sets the public mint state
    /// @param _saleActiveState boolean indicating new public sale state
    function setSaleState(bool _saleActiveState) public onlyOwner {
        require(isPublicSaleActive != _saleActiveState, "NEW_STATE_IDENTICAL_TO_OLD_STATE");
        isPublicSaleActive = _saleActiveState;
    }

    /// @notice pauses minting
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice unpauses minting
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Mints a new token in public sale for mint price
    /// @param mintQuantity the number of tokens to mint
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

    /// @notice Mints a new token for affe holders
    /// @param _tokenIds the token ids to redeem 
    function affenMint(uint256[] calldata _tokenIds) external virtual nonReentrant {
        checkRedeem(_tokenIds, msg.sender);
        _safeMint(msg.sender, _tokenIds.length * 2);
    }

    function checkRedeem(uint256[] calldata _tokenIds, address ownerId) internal {
        for(uint256 i = 0; i < _tokenIds.length; i++) {
            require(openseaContract.balanceOf(ownerId, _tokenIds[i]) > 0, "AFFE_NOT_OWNED");
            require(!affeRedeemed[_tokenIds[i]], "AFFE_ALREADY_REDEEMED");
            affeRedeemed[_tokenIds[i]] = true;
        }
    }

    /// @notice sets the Opensea token ids of their corresponding Affen
    /// @param _tokenIds array of token ids from Affe mit Waffe
    /// @param _openseaIds array of corresponding ids on the Opensea ERC1155 contract
    function setAffeIds(uint256[] calldata _tokenIds, uint256[] calldata _openseaIds) external onlyOwner {
        require(_tokenIds.length == _openseaIds.length, "DIFFERENT_LENGTH_PARAMETERS");
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            affeIds[_tokenIds[i]] = _openseaIds[i];
        }
    }

    /// @notice gets the tokens owned by the given address
    /// @param _owner address of the owner
    function ownedTokensByAddress(address _owner) external view returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](balanceOf(_owner));
        uint256 index = 0;
        for (uint256 i = 0; i < totalSupply(); i++) {
            if(ownerOf(i) == _owner)
                tokenIds[index++] = i;
        }
        return tokenIds;
    }

    /// @notice Allow contract owner to withdraw funds to its own account.
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}