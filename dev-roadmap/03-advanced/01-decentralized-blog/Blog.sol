// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @author Ashraf Morningstar
 * @github https://github.com/AshrafMorningstar
 * @project Decentralized Content Publishing Platform
 */

contract Blog {
    struct Post {
        uint256 id;
        string title;
        string contentHash; // IPFS Hash
        address author;
        uint256 timestamp;
        uint256 likes;
    }

    Post[] public posts;
    uint256 public postCount;
    string public blogName;

    event NewPost(uint256 indexed id, address indexed author, string title);
    event PostLiked(uint256 indexed id, address indexed liker);

    constructor(string memory _name) {
        blogName = _name;
        postCount = 0;
    }

    function createPost(string memory _title, string memory _contentHash) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_contentHash).length > 0, "Content cannot be empty");

        posts.push(Post(postCount, _title, _contentHash, msg.sender, block.timestamp, 0));
        emit NewPost(postCount, msg.sender, _title);
        postCount++;
    }

    function likePost(uint256 _id) public {
        require(_id < postCount, "Post does not exist");
        posts[_id].likes++;
        emit PostLiked(_id, msg.sender);
    }

    function getAllPosts() public view returns (Post[] memory) {
        return posts;
    }

    function getPost(uint256 _id) public view returns (Post memory) {
        require(_id < postCount, "Post does not exist");
        return posts[_id];
    }
}
