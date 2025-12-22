/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const VideoPlayer: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-black">
            <div className="flex-1 flex items-center justify-center">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&controls=1" 
                    title="Video Player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                 />
            </div>
        </div>
    );
};

export default VideoPlayer;