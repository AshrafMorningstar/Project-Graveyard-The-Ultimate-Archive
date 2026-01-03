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

import React, { useState } from 'react'
import { Search, Star, MessageVideo, Calendar, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mentors } from './data'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="py-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Micro Mentors
          </h1>
          <p className="text-gray-500 mt-1">Instant 15-min video sessions with experts.</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-full">
           <User className="text-gray-600" />
        </div>
      </header>

      {/* Search */}
      <div className="relative mb-12">
        <input 
          type="text" 
          placeholder="Search by name, company, or skill..." 
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-primary font-medium">{mentor.role}</p>
            <p className="text-gray-400 text-sm mb-4">at {mentor.company}</p>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {mentor.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 w-full mt-auto">
              <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Calendar size={18} /> Book
              </button>
              <button 
                onClick={() => navigate(`/call/${mentor.id}`)}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageVideo size={18} /> Call Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
