// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title Minter
 * @author Jason Hedman (https://twitter.com/gabceb)
 * @notice This contract handles minting and loaning of ___ ERC721 tokens.
 */
contract Minter is ERC721A, ReentrancyGuard, Ownable, Pausable {

    using ECDSA for bytes32;
    using Strings for uint256;

    // Public vars
    string public baseTokenURI;
    uint256 public price = 0.125 ether;

    // Immutable vars
    uint256 public immutable maxSupply;

    /**
     * @notice Construct a Meta Angels instance
     * @param name Token name
     * @param symbol Token symbol
     * @param baseTokenURI_ Base URI for all tokens
     * @param maxSupply_ Max Supply of tokens
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI_,
        uint256 maxSupply_
    ) ERC721A(name, symbol) {
        require(maxSupply_ > 0, "INVALID_SUPPLY");
        baseTokenURI = baseTokenURI_;
        maxSupply = maxSupply_;
    }

    mapping (address => uint256) public totalMintsPerAddress;

    bool public isSaleActive = true;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /**
     * To be updated by contract owner to allow updating the mint price
     */
    function setMintPrice(uint256 _newMintPrice) public onlyOwner {
        require(price != _newMintPrice, "NEW_STATE_IDENTICAL_TO_OLD_STATE");
        price = _newMintPrice;
    }

    /**
     * To be updated by contract owner to allow gold and silver lists members
     */
    function setSaleState(bool _saleActiveState) public onlyOwner {
        require(isSaleActive != _saleActiveState, "NEW_STATE_IDENTICAL_TO_OLD_STATE");
        isSaleActive = _saleActiveState;
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

    /**
     * @notice Allow for minting of tokens up to the maximum allowed for a given address.
     * The address of the sender and the number of mints allowed are hashed and signed
     * with the server's private key and verified here to prove whitelisting status.
     */
    function mint(uint256 mintNumber) external payable virtual nonReentrant {
        require(isSaleActive, "SALE_IS_NOT_ACTIVE");
        // Imprecise floats are scary. Front-end should utilize BigNumber for safe precision, but adding margin just to be safe to not fail txs
        require(msg.value >= ((price * mintNumber) - 0.0001 ether) && msg.value <= ((price * mintNumber) + 0.0001 ether), "INVALID_PRICE");

        uint256 currentSupply = totalSupply();

        require(currentSupply + mintNumber <= maxSupply, "NOT_ENOUGH_MINTS_AVAILABLE");

        totalMintsPerAddress[msg.sender] += mintNumber;

        _safeMint(msg.sender, mintNumber);

        if (currentSupply + mintNumber == maxSupply) {
            isSaleActive = false;
        }
    }

    /**
     * @notice Allow owner to send `mintNumber` tokens without cost to multiple addresses
     */
    function gift(address[] calldata receivers, uint256 mintNumber) external onlyOwner {
        require((totalSupply() + (receivers.length * mintNumber)) <= maxSupply, "MINT_TOO_LARGE");

        for (uint256 i = 0; i < receivers.length; i++) {
            _safeMint(receivers[i], mintNumber);
        }
    }

    /**
     * @notice Allow contract owner to withdraw funds to its own account.
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}