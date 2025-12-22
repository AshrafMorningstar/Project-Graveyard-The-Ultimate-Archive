/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { ethers } from 'ethers'

// Mock IPFS upload
export const uploadToIPFS = async (content) => {
  // Simulate delay
  await new Promise(r => setTimeout(r, 1500))
  // Return a mock CID
  return 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Mock Smart Contract Interaction
export const publishToBlockchain = async (title, cid) => {
  await new Promise(r => setTimeout(r, 2000))
  return {
    blockHash: '0x' + Math.random().toString(16).substr(2, 64),
    transactionHash: '0x' + Math.random().toString(16).substr(2, 64)
  }
}

// Mock Initial Data
export const initialPosts = [
  {
    id: 1,
    title: 'The Future of Web3',
    content: 'Decentralization offers a path to ...',
    author: '0x71C...9A2d',
    cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    timestamp: Date.now() - 10000000
  },
  {
    id: 2,
    title: 'Learning Rust',
    content: 'Rust is empowering the next gen of systems...',
    author: '0x3g2...1B3a',
    cid: 'QmZ4tDuvesjQ5wknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    timestamp: Date.now() - 25000000
  }
]
