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

import { useState } from 'react'
import { Image as ImageIcon, Heart, Info, Grid, Maximize2 } from 'lucide-react'

// Using Unsplash source for meaningful placeholder images
const ALBUMS = [
  { id: 'all', name: 'Recents', count: 128 },
  { id: 'favorites', name: 'Favorites', count: 24 },
  { id: 'travel', name: 'Travel', count: 45 },
  { id: 'design', name: 'Design', count: 12 },
]

const PHOTOS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  url: `https://images.unsplash.com/photo-${[
    '1682687982502-b05f119658e6',
    '1682687220742-aba13b6e50ba',
    '1682686581854-5e548806f3e0',
    '1682695796954-6b905439e4e6',
    '1682685797208-d7480c4c4e3e'
  ][i % 5]}?w=500&auto=format&fit=crop`,
  date: new Date(Date.now() - i * 86400000).toLocaleDateString()
}))

export default function Photos() {
  const [selectedAlbum, setSelectedAlbum] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <div className="w-48 bg-slate-50 dark:bg-[#252526] border-r border-slate-200 dark:border-black/20 flex flex-col pt-4">
        <div className="px-4 text-xs font-semibold text-slate-500 mb-2">Albums</div>
        {ALBUMS.map(album => (
          <div 
            key={album.id}
            onClick={() => setSelectedAlbum(album.id)}
            className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer ${selectedAlbum === album.id ? 'bg-indigo-500 text-white' : 'hover:bg-slate-200 dark:hover:bg-white/10'}`}
          >
            <span>{album.name}</span>
            <span className={`text-xs ${selectedAlbum === album.id ? 'text-indigo-200' : 'text-slate-400'}`}>{album.count}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4">
          <span className="font-semibold text-lg">{ALBUMS.find(a => a.id === selectedAlbum)?.name}</span>
          <div className="flex gap-2">
             <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded"><Grid size={16} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
           {selectedPhoto === null ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {PHOTOS.map(photo => (
                  <div 
                    key={photo.id} 
                    className="aspect-square bg-slate-200 dark:bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedPhoto(photo.id)}
                  >
                    <img src={photo.url} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
             </div>
           ) : (
             <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center bg-black/5 dark:bg-black/40 rounded-lg overflow-hidden relative group">
                   <img src={PHOTOS.find(p => p.id === selectedPhoto)?.url} className="max-w-full max-h-full object-contain shadow-2xl" />
                   
                   <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"><Heart size={16} /></button>
                      <button className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"><Info size={16} /></button>
                      <button className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70" onClick={() => setSelectedPhoto(null)}><Maximize2 size={16} /></button>
                   </div>
                </div>
                <div className="h-16 flex items-center justify-center gap-2 mt-4 overflow-x-auto">
                   {PHOTOS.map(photo => (
                      <div 
                        key={photo.id} 
                        className={`w-12 h-12 rounded cursor-pointer overflow-hidden border-2 ${selectedPhoto === photo.id ? 'border-indigo-500' : 'border-transparent'}`}
                        onClick={() => setSelectedPhoto(photo.id)}
                      >
                         <img src={photo.url} className="w-full h-full object-cover" />
                      </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
