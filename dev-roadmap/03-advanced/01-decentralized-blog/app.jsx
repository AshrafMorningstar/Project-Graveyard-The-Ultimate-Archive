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

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Decentralized Content Publishing Platform
 */

// Import Ethers.js from CDN in index.html, assuming it's available as window.ethers
const { ethers } = window;

const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
const ABI = [
    "function createPost(string _title, string _contentHash) public",
    "function getAllPosts() public view returns (tuple(uint256 id, string title, string contentHash, address author, uint256 timestamp, uint256 likes)[])",
    "function likePost(uint256 _id) public",
    "event NewPost(uint256 indexed id, address indexed author, string title)"
];

const DApp = () => {
    const [account, setAccount] = React.useState(null);
    const [contract, setContract] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // Initial Load & Listeners
    React.useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => setAccount(accounts[0]));
        }
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                
                // Init Provider & Contract
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const blogContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
                setContract(blogContract);
                
                // Fetch Posts (Mocking success if contract isn't actually deployed)
                fetchPosts(blogContract);
            } catch (error) {
                console.error("User denied account access or Contract not found");
                alert("Connection Failed. Make sure you are on the right network!");
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const fetchPosts = async (contractInstance) => {
        setLoading(true);
        try {
            const rawPosts = await contractInstance.getAllPosts();
            // Format data
            const formatted = rawPosts.map(p => ({
                id: p.id.toNumber(),
                title: p.title,
                content: p.contentHash, // In real app, fetch this hash from IPFS
                author: p.author,
                likes: p.likes.toNumber()
            }));
            setPosts(formatted);
        } catch (e) {
            console.warn("Contract fetch failed (Contract not deployed?). Using Mock Data.");
            setPosts([
                { id: 1, title: 'The Future of Web3', author: '0x123...abc', content: 'Decentralization is key to privacy...', likes: 5 },
                { id: 2, title: 'Solidity Tips', author: '0x456...def', content: 'Always check for re-entrancy attacks!', likes: 12 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        if (!contract) return alert("Connect Wallet first!");
        
        const title = prompt("Enter Post Title:");
        const content = prompt("Enter Post Content:");
        
        if (!title || !content) return;

        try {
            // In real app: Upload content to IPFS -> get Hash -> createPost(title, hash)
            const tx = await contract.createPost(title, content);
            await tx.wait();
            alert("Post Published on Blockchain!");
            fetchPosts(contract);
        } catch (e) {
            console.error(e);
            alert("Transaction Failed (See Console)");
        }
    };

    return (
        <div className="dapp-container">
            <nav>
                <div className="logo">BlockPub</div>
                <button className="connect-btn" onClick={connectWallet}>
                    {account ? `🟢 ${account.substring(0,6)}...${account.substring(38)}` : 'Connect Wallet'}
                </button>
            </nav>

            <header className="hero">
                <h1>Uncensorable Thoughts</h1>
                <p>Published permanently on the Blockchain.</p>
                <button className="publish-btn" onClick={handlePublish}>Write New Story</button>
            </header>

            <div className="feed">
                {loading && <p style={{textAlign: 'center'}}>Loading Blockchain Data...</p>}
                
                {posts.map(post => (
                    <article key={post.id} className="post-card">
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h2>{post.title}</h2>
                            <span style={{color:'#00f0ff'}}>♥ {post.likes}</span>
                        </div>
                        <div className="meta">
                            <span>By {post.author.substring(0,8)}...</span>
                        </div>
                        <p>{post.content}</p>
                    </article>
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DApp />);
