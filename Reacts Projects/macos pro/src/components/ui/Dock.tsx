/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useRef, useEffect } from 'react';
import { apps } from '../../config/apps';
import { useStore } from '../../store/useStore';
import gsap from 'gsap';

export default function Dock() {
    const { openApp, appStates } = useStore();
    const dockRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
             
            iconsRef.current.forEach((icon) => {
                if (!icon) return;
                const rect = icon.getBoundingClientRect();
                const iconCenterX = rect.left + rect.width / 2;
                const distance = Math.abs(mouseX - iconCenterX);
                
                // Distance in pixels where effect starts
                const maxDistance = 150; 
                
                if (distance < maxDistance) {
                    // Calculate scale using a sine curve for smoothness or just simple linear
                    const scale = 1 + (1.5 - 1) * Math.pow((1 - distance / maxDistance), 2); // easing
                    gsap.to(icon, { scale: scale, width: 56 * scale, height: 56 * scale, duration: 0.1, overwrite: 'auto' });
                    // Also need to adjust margin or just let flex gap handle it? 
                    // Actually scaling element in flex might cause jitter if width changes layout.
                    // Better to just scale transform, but then items overlap.
                    // MacOS dock pushes items aside.
                    // Changing width is better but performance heavy.
                    // Let's rely on transform scale for now, maybe small margin adjustment.
                    gsap.to(icon, { margin: `0 ${10 * (scale - 1)}px`, duration:0.1 });
                } else {
                    gsap.to(icon, { scale: 1, width: 56, height: 56, margin: 0, duration: 0.2, overwrite: 'auto' });
                }
            });
        };

        const handleMouseLeave = () => {
             iconsRef.current.forEach((icon) => {
                if (!icon) return;
                gsap.to(icon, { scale: 1, width: 56, height: 56, margin: 0, duration: 0.3, overwrite: true });
             });
        };

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const bounce = (id: string, index: number) => {
        const icon = iconsRef.current[index];
        if (icon) {
            gsap.to(icon, { y: -20, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" });
        }
        openApp(id);
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9000] mb-2" ref={dockRef}>
           <div className="flex items-end gap-2 px-4 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl h-16 md:h-[4.5rem] box-content">
               {apps.map((app, index) => (
                   <div key={app.id} className="relative flex flex-col items-center justify-end block h-full">
                        {/* Tooltip */}
                        <div className="group">
                        
                            <button
                                ref={(el) => { if (el) iconsRef.current[index] = el; }}
                                onClick={() => bounce(app.id, index)}
                                className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center p-2 shadow-lg border border-white/10 relative origin-bottom will-change-transform"
                                aria-label={app.title}
                            >
                                <app.icon size={30} className="text-white drop-shadow-md relative z-10" />
                                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900/80 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-md pointer-events-none mb-2 border border-white/10 shadow-xl whitespace-nowrap z-50">
                                {app.title}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/80"></div>
                            </div>
                         </div>

                        {/* Dot for open apps using state */}
                        <div className={`absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all duration-300 ${appStates[app.id]?.isOpen ? 'opacity-100' : 'opacity-0'}`} />
                   </div>
               ))}
           </div>
        </div>
    )
}
