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

import React, { useState, useEffect } from 'react'
import { Wallet, Upload, Cloud, Link as LinkIcon, ShieldCheck, PenTool, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { uploadToIPFS, publishToBlockchain, initialPosts } from './web3'

function App() {
  const [account, setAccount] = useState(null)
  const [activeTab, setActiveTab] = useState('feed') // feed | publish
  const [posts, setPosts] = useState(initialPosts)
  
  // Publish Form State
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState('')

  const connectWallet = async () => {
    // Simulating wallet connection
    setTimeout(() => {
      setAccount('0x71C...9A2d')
    }, 800)
  }

  const handlePublish = async (e) => {
    e.preventDefault()
    if (!title || !content) return

    setIsPublishing(true)
    
    try {
      setPublishStatus('Uploading to IPFS...')
      const cid = await uploadToIPFS(content)
      
      setPublishStatus('Confirming Transaction...')
      await publishToBlockchain(title, cid)

      const newPost = {
        id: posts.length + 1,
        title,
        content,
        author: account,
        cid,
        timestamp: Date.now()
      }
      
      setPosts([newPost, ...posts])
      setTitle('')
      setContent('')
      setActiveTab('feed')
    } catch (err) {
      console.error(err)
    } finally {
      setIsPublishing(false)
      setPublishStatus('')
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border bg-bg/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary font-bold text-xl font-display">
            <Cloud size={28} /> dStore
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`text-sm font-medium transition-colors ${activeTab === 'feed' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Feed
            </button>
            <button 
              onClick={() => setActiveTab('publish')}
              className={`text-sm font-medium transition-colors ${activeTab === 'publish' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Publish
            </button>
            
            {account ? (
              <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-full text-xs font-mono text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {account}
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                <Wallet size={16} /> Connect
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'feed' ? (
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold font-display">Recent Publications</h1>
                <div className="flex items-center gap-2 text-green-500 text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                   <ShieldCheck size={16} /> Verifiable Content
                </div>
             </div>

             {posts.map(post => (
               <article key={post.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h2 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{post.title}</h2>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                           <span className="font-mono text-xs bg-bg px-2 py-0.5 rounded border border-border">{post.author}</span>
                           <span>•</span>
                           <span>{formatDistanceToNow(post.timestamp)} ago</span>
                        </div>
                     </div>
                     <a href={`https://ipfs.io/ipfs/${post.cid}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary transition-colors" title="View on IPFS">
                        <LinkIcon size={20} />
                     </a>
                  </div>
                  
                  <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                    <ReactMarkdown>{post.content.length > 200 ? post.content.slice(0, 200) + '...' : post.content}</ReactMarkdown>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs font-mono text-gray-500 overflow-hidden">
                     <span className="text-blue-400 font-bold">IPFS CID:</span> {post.cid}
                  </div>
               </article>
             ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
             <div className="text-center mb-8">
               <h1 className="text-3xl font-bold font-display mb-2">Publish to the Permanent Web</h1>
               <p className="text-gray-400">Content is stored on IPFS and indexed on the Blockchain.</p>
             </div>

             {!account ? (
               <div className="text-center p-12 custom-dashed rounded-xl bg-card">
                  <Wallet size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-lg font-medium text-gray-300 mb-4">Connect your wallet to start publishing</p>
                  <button onClick={connectWallet} className="bg-primary px-6 py-2 rounded-lg font-bold">Connect Wallet</button>
               </div>
             ) : (
               <form onSubmit={handlePublish} className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-xl">
                  <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                     <input 
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                       placeholder="Enter article title..."
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2">Content (Markdown Supported)</label>
                     <textarea 
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                       rows={8}
                       className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                       placeholder="Write your story..."
                     />
                  </div>

                  <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 flex gap-3 text-sm text-blue-200">
                     <ShieldCheck size={20} className="shrink-0" />
                     <p>Your content will be immutable once published. Ensure you have reviewed it carefully.</p>
                  </div>

                  <button 
                    disabled={isPublishing || !title || !content}
                    type="submit" 
                    className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {publishStatus}
                      </>
                    ) : (
                      <>
                        <Upload size={20} /> Publish to IPFS
                      </>
                    )}
                  </button>
               </form>
             )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
