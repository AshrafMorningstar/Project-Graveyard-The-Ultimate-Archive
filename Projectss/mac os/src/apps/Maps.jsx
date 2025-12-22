/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Maps = () => {
    // Using an iframe for OpenStreetMap
    return (
        <div className="h-full w-full relative bg-[#e5e3df]">
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5259%2C37.7088%2C-122.3582%2C37.8166&amp;layer=mapnik" 
                className="filter contrast-100"
            ></iframe>
             
             {/* Overlay Controls */}
             <div className="absolute top-4 left-4 right-4 flex gap-2">
                 <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center px-4 h-10">
                     <MapPin size={16} className="text-gray-400 mr-2" />
                     <input type="text" placeholder="Search Maps" className="flex-1 outline-none text-sm" />
                 </div>
                 <button className="w-10 h-10 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white">
                     <Navigation size={20} />
                 </button>
             </div>
        </div>
    );
};

export default Maps;
