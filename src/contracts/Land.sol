// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Land is ERC721 {
    uint public cost = 1 ether;
    uint public maxSupply = 5;
    uint public totalSupply;

    // Every building will be a struct
    struct Building {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        uint256 sizeX;
        uint256 sizeY;
        uint256 sizeZ;
    }

    Building[] public buildings;

    constructor(string memory _name, string memory _symbol, uint _cost) ERC721(_name, _symbol) {
        cost = _cost;
        // Create a default buildings for selling 
        buildings.push(
            Building("City Hall", address(0x0), 0, 0, 0, 10, 10, 10)
        );
        buildings.push(
            Building("Stadium", address(0x0), 0, 10, 0, 10, 5, 3)
        );
        buildings.push(
            Building("University", address(0x0), 0, -10, 0, 10, 5, 3)
        );
        buildings.push(
            Building("Shopping Plaza 1", address(0x0), 10, 0, 0, 5, 25, 5)
        );
        buildings.push(
            Building("Shopping Plaza 2", address(0x0), -10, 0, 0, 5, 25, 5)
        );
    }

    receive() external payable { }


    function mint(uint256 _id) public payable {
        uint256 supply = totalSupply;
        // check if buildings awailable, condition must be true to continue execution
        require(supply <= maxSupply);
        // check if the building has a owner - start from 0
        require(buildings[_id - 1].owner == address(0x0));
        // check the price payed
        require(msg.value >= cost, "You should pay at least 1 Ether");

        // buy the building
        buildings[_id - 1 ].owner = msg.sender;
        totalSupply += 1;

        _safeMint(msg.sender, _id);
    }


    function transferFrom(address from, address to, uint256 tokenId) public override {
        // check if it's approved using openzeppling ERC721
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved!");
    
       // transfer building
       buildings[tokenId - 1].owner = to;
       _transfer(from, to, tokenId); 
    }

    function safeTransferFrom(address from, address to, uint tokenId, bytes memory _data) public override {
        // check if it's approved using openzeppling ERC721
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved!");

        // update buildings ownership
        buildings[tokenId - 1].owner = to;
        _safeTransfer(from, to, tokenId, _data); 
    }

    function getBuildings() public view returns(Building[] memory) {
        return buildings;
    }

    function getBuilding(uint256 _id) public view returns(Building memory) {
        return buildings[_id  - 1];
    }
}
