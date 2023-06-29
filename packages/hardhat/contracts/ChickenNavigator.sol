//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ChickenNavigator {
    address public immutable owner;
    uint public numberOfPlays = 0;
    uint public reward = 0.1 ether;

    event matchResult(address player, uint256[] userNums, uint256[] winnerNums, bool isMatch);

    constructor(address _owner) {
        owner = _owner;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function playGame(uint256[] memory userNums) external payable{
        require(msg.value >= 0.001 ether, "Failed to send enough value");
        require(address(this).balance >= reward, "Not enough reward");

        uint256[] memory winnerNums = getWinnerNums();
        numberOfPlays += 1;

        bool isWinner = checkForMatching(userNums, winnerNums);

         if (isWinner ) {
            (bool sent, ) = msg.sender.call{value: reward}("");
            require(sent, "Failed to send Ether");
        }

        emit matchResult(msg.sender, userNums, winnerNums, isWinner);
    }

    function getWinnerNums() internal view returns (uint256[] memory) {
        uint256[] memory winnerNums = new uint256[](5);

        for(uint i = 0; i < 5; i++){
            uint256 _randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender, i))) % 5;
            winnerNums[i] = _randomNumber;
        }

        return winnerNums;
    }

    function checkForMatching(uint256[] memory userNums, uint256[] memory winnerNums) internal returns (bool) {
        for(uint i = 0; i < 5; i++){
            if(userNums[i] != winnerNums[i]) return false;
        }

        return true;
    }

    function getPrizePool() external view returns (uint) {
        return address(this).balance;
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}