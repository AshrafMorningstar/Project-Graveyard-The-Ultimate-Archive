// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title KnowledgeStore by AshrafMorningstar
contract KnowledgeStore {
    struct Article {
        string cid;
        address author;
        uint256 timestamp;
    }

    Article[] public articles;

    function publish(string memory cid) public {
        articles.push(Article(cid, msg.sender, block.timestamp));
    }

    function getCount() public view returns (uint256) {
        return articles.length;
    }
}
