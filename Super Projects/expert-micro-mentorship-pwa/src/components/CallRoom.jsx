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

import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CallRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [peerId, setPeerId] = useState('')
  const [remotePeerId, setRemotePeerId] = useState('')
  const remoteVideoRef = useRef(null)
  const currentUserVideoRef = useRef(null)
  const peerInstance = useRef(null)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  useEffect(() => {
    const peer = new Peer()

    peer.on('open', (id) => {
      setPeerId(id)
    })

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream
          currentUserVideoRef.current.play()
          call.answer(mediaStream)
          call.on('stream', function(remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream
            remoteVideoRef.current.play()
          })
        })
    })

    peerInstance.current = peer

    return () => {
      peer.destroy()
    }
  }, [])

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream
        currentUserVideoRef.current.play()

        const call = peerInstance.current.call(remotePeerId, mediaStream)

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play()
        })
      })
  }
  
  const endCall = () => {
      if(currentUserVideoRef.current && currentUserVideoRef.current.srcObject) {
          currentUserVideoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
      navigate('/')
  }

  const toggleAudio = () => {
    const stream = currentUserVideoRef.current.srcObject
    if(stream) {
        stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled
        setIsAudioMuted(!stream.getAudioTracks()[0].enabled)
    }
  }

  const toggleVideo = () => {
      const stream = currentUserVideoRef.current.srcObject
      if(stream) {
          stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled
          setIsVideoOff(!stream.getVideoTracks()[0].enabled)
      }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 h-[70vh]">
        {/* Remote Video */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <video ref={remoteVideoRef} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm">
            Mentor
          </div>
        </div>

        {/* Local Video */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <video ref={currentUserVideoRef} className="w-full h-full object-cover" muted />
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm">
            You
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-6">
        <button 
           onClick={toggleAudio}
           className={`p-4 rounded-full transition-colors ${isAudioMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
        >
          {isAudioMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        <button 
            onClick={endCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transform hover:scale-105 transition-all"
        >
          <PhoneOff size={32} />
        </button>

        <button 
           onClick={toggleVideo}
           className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
        >
          {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
        </button>
      </div>

      <div className="mt-8 text-gray-500 text-sm font-mono bg-gray-800 px-4 py-2 rounded-lg">
        My ID: <span className="text-white select-all">{peerId}</span>
      </div>
      
      <div className="mt-4 flex gap-2">
         <input 
            value={remotePeerId}
            onChange={(e) => setRemotePeerId(e.target.value)}
            placeholder="Enter Mentor ID to call"
            className="bg-gray-800 border-none text-white px-4 py-2 rounded-lg"
         />
         <button onClick={() => call(remotePeerId)} className="bg-primary text-white px-4 py-2 rounded-lg">Call</button>
      </div>
    </div>
  )
}
