/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Folder, FileText, Image, Layout, HardDrive, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Finder = () => {
    const { openApp } = useStore();
    
    const sidebarItems = [
        { name: 'Recent', icon: Layout, active: true },
        { name: 'Desktop', icon: Layout },
        { name: 'Documents', icon: FileText },
        { name: 'Downloads', icon: HardDrive },
        { name: 'Pictures', icon: Image },
    ];

    const files = [
        { name: 'About User.txt', type: 'text', app: 'about' },
        { name: 'Projects Folder', type: 'folder', app: 'projects' },
        { name: 'Resume.pdf', type: 'pdf', app: null },
        { name: 'Skills.html', type: 'html', app: 'skills' },
        { name: 'GitHub Link', type: 'link', app: 'safari' },
    ];

    return (
        <div className="h-full bg-white flex text-sm text-gray-700 select-none">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100/80 backdrop-blur-xl border-r p-3 flex flex-col gap-1 pt-10">
                <div className="text-[10px] font-semibold text-gray-400 pl-2 mb-1 uppercase tracking-wider">Favorites</div>
                {sidebarItems.map(item => (
                    <div key={item.name} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-default ${item.active ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}`}>
                        <item.icon size={16} className={item.active ? 'text-blue-500' : 'text-gray-500'} />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                 <div className="h-12 border-b flex items-center px-4 gap-4 text-gray-400 bg-white">
                      <div className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors text-gray-600">
                          <ChevronRight size={16} />
                          <span className="font-semibold text-black">MacBook Pro</span>
                      </div>
                 </div>
                 
                 <div className="p-4 grid grid-cols-4 gap-4 content-start">
                     {files.map((file) => (
                         <div 
                            key={file.name} 
                            className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-center group"
                            onDoubleClick={() => file.app && openApp(file.app)}
                         >
                             {file.type === 'folder' ? (
                                 <Folder size={48} className="fill-blue-400 text-blue-500 drop-shadow-sm" />
                             ) : file.type === 'link' ? (
                                 <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border">
                                    <span className="text-[8px] font-bold text-blue-500">HTTP</span>
                                 </div>
                             ) : (
                                 <FileText size={48} className="text-gray-400 drop-shadow-sm" />
                             )}
                             <span className="text-xs group-hover:text-blue-600 text-gray-700 font-medium px-2 py-0.5 rounded leading-tight">{file.name}</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default Finder;
