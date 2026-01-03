/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Decentralized Skill Marketplace
   Level: Advanced
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const { createApp, ref, onMounted } = Vue;

// --- Mock Blockchain Classes ---
class Transaction {
    constructor(from, to, details) {
        this.from = from;
        this.to = to;
        this.details = details;
        this.timestamp = Date.now();
    }
}

class Block {
    constructor(index, transactions, previousHash = '') {
        this.index = index;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.timestamp = Date.now();
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(
            this.index + 
            this.previousHash + 
            this.timestamp + 
            JSON.stringify(this.transactions) + 
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        // Simple Proof of Work
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3; // Keep low for browser demo
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block(0, [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress) {
        // In real world, miners pick transactions. Here we take all awaiting.
        const block = new Block(
            this.chain.length, 
            this.pendingTransactions, 
            this.getLatestBlock().hash
        );
        
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = []; // Reset
        return block;
    }
}

// --- Vue App ---
createApp({
    setup() {
        const walletAddress = ref("0x" + Math.random().toString(16).substr(2, 40));
        const mySkills = ref(['JavaScript', 'Vue.js', 'Design']);
        const chain = ref(new Blockchain());
        const blocks = ref(chain.value.chain);
        
        const contracts = ref([
            { id: 'ct_1234', title: 'Need Logo Design', offering: 'React Mentoring', seeking: 'Logo Design', status: 'OPEN', creator: "0xABC..." },
            { id: 'ct_5678', title: 'Backend API Help', offering: 'Frontend Dev', seeking: 'Node.js Help', status: 'OPEN', creator: "0xDEF..." }
        ]);

        const addSkill = () => {
            const skill = prompt("Add a skill credential:");
            if (skill && !mySkills.value.includes(skill)) {
                // Record on chain
                chain.value.addTransaction(new Transaction(walletAddress.value, "Network", { type: "ADD_SKILL", skill }));
                mine();
                mySkills.value.push(skill);
            }
        };

        const createContract = () => {
            const title = prompt("Contract Title:");
            if(!title) return;
            const offer = prompt("What do you offer?");
            const seek = prompt("What do you seek?");
            
            contracts.value.unshift({
                id: 'ct_' + Math.random().toString(36).substr(2, 4),
                title, offering: offer, seeking: seek,
                status: 'OPEN', creator: walletAddress.value
            });
        };

        const executeContact = async (contract) => {
            if (confirm(`Accept swap: ${contract.offering} for ${contract.seeking}?`)) {
                contract.status = 'PENDING';
                
                // Add Transaction
                chain.value.addTransaction(new Transaction(
                    walletAddress.value, 
                    contract.creator, 
                    { type: "SWAP_EXECUTION", contractId: contract.id }
                ));

                // Simulate Mining Delay
                await new Promise(r => setTimeout(r, 100)); // UI update
                mine();
                
                contract.status = 'CLOSED';
            }
        };

        const mine = () => {
            // Force Reactivity
            chain.value.minePendingTransactions(walletAddress.value);
            blocks.value = [...chain.value.chain]; // Update UI
        };

        return {
            walletAddress,
            mySkills,
            blocks,
            contracts,
            addSkill,
            createContract,
            executeContact
        };
    }
}).mount('#app');
