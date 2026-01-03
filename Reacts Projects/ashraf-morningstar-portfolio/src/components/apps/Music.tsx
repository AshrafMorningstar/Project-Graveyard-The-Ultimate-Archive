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

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Music as MusicIcon, Volume2, List, Repeat, Shuffle } from 'lucide-react'

const SONGS = [
  { id: 1, title: 'Midnight City', artist: 'M83', duration: 243, cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop' },
  { id: 2, title: 'Starboy', artist: 'The Weeknd', duration: 230, cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&h=300&fit=crop' },
  { id: 3, title: 'Nightcall', artist: 'Kavinsky', duration: 256, cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop' },
  { id: 4, title: 'Resonance', artist: 'Home', duration: 212, cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=300&h=300&fit=crop' },
  { id: 5, title: 'After Dark', artist: 'Mr. Kitty', duration: 259, cover: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=300&h=300&fit=crop' },
]

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentSong = SONGS[currentSongIndex]

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            nextSong()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, currentSong])

  const togglePlay = () => setIsPlaying(!isPlaying)
  
  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
  }

  return (
    <div className="flex flex-col h-full bg-[#1c1c1e] text-white">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
        <button onClick={() => setShowPlaylist(!showPlaylist)} className={`p-2 rounded-md ${showPlaylist ? 'text-green-500 bg-white/10' : 'text-gray-400 hover:text-white'}`}>
           <List size={20} />
        </button>
        <span className="text-xs font-medium tracking-widest uppercase text-gray-500">Now Playing</span>
        <button className="p-2 text-gray-400 hover:text-white"><Repeat size={20} /></button>
      </div>

      {showPlaylist ? (
        <div className="flex-1 overflow-y-auto p-2">
           {SONGS.map((song, i) => (
             <div 
               key={song.id}
               onClick={() => { setCurrentSongIndex(i); setIsPlaying(true); setShowPlaylist(false); }}
               className={`flex items-center p-3 rounded-lg gap-3 cursor-pointer ${currentSongIndex === i ? 'bg-white/10' : 'hover:bg-white/5'}`}
             >
                <img src={song.cover} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1 overflow-hidden">
                  <div className={`text-sm font-medium ${currentSongIndex === i ? 'text-green-500' : 'text-white'}`}>{song.title}</div>
                  <div className="text-xs text-gray-400">{song.artist}</div>
                </div>
                {currentSongIndex === i && isPlaying && <div className="flex gap-0.5 items-end h-3">
                   <div className="w-0.5 bg-green-500 animate-[music-bar_0.5s_ease-in-out_infinite]" style={{ height: '60%' }} />
                   <div className="w-0.5 bg-green-500 animate-[music-bar_0.5s_ease-in-out_infinite_0.1s]" style={{ height: '100%' }} />
                   <div className="w-0.5 bg-green-500 animate-[music-bar_0.5s_ease-in-out_infinite_0.2s]" style={{ height: '40%' }} />
                </div>}
             </div>
           ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in duration-300">
          <div className="relative group w-64 h-64">
            <img 
              src={currentSong.cover} 
              className={`w-full h-full rounded-2xl shadow-2xl object-cover transition-transform duration-500 ${isPlaying ? 'scale-100' : 'scale-95 opacity-80'}`} 
            />
            {!isPlaying && <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl"><Play size={48} fill="white" className="opacity-80" /></div>}
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold truncate max-w-[280px]">{currentSong.title}</h2>
            <p className="text-gray-400">{currentSong.artist}</p>
          </div>
        </div>
      )}

      {/* Player Controls */}
      <div className="bg-[#2c2c2e] p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10 border-t border-white/5">
         {/* Progress Bar */}
         <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mb-6">
           <span>{formatTime(currentTime)}</span>
           <div className="flex-1 relative h-1 bg-white/10 rounded-full group">
             <div 
               className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300" 
               style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
             >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow scale-0 group-hover:scale-100 transition-all" />
             </div>
             <input 
               type="range" 
               min={0} 
               max={currentSong.duration} 
               value={currentTime} 
               onChange={handleSeek}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
           </div>
           <span>{formatTime(currentSong.duration)}</span>
         </div>

         <div className="flex items-center justify-between">
           <Volume2 size={20} className="text-gray-400" />
           
           <div className="flex items-center gap-6">
             <button onClick={prevSong} className="text-gray-200 hover:text-white transition-transform active:scale-95">
               <SkipBack size={28} fill="currentColor" />
             </button>
             <button 
               onClick={togglePlay}
               className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-white/20 active:scale-95"
             >
               {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
             </button>
             <button onClick={nextSong} className="text-gray-200 hover:text-white transition-transform active:scale-95">
               <SkipForward size={28} fill="currentColor" />
             </button>
           </div>
           
           <Shuffle size={20} className="text-gray-400" />
         </div>
      </div>
      
      <style jsx>{`
        @keyframes music-bar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
