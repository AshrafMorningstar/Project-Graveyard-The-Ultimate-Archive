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

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register standard GSAP plugins if needed (not strictly necessary for basic use but good practice)
// gsap.registerPlugin(useGSAP);

export const useHoverScale = (scale = 1.1, duration = 0.2) => {
    const ref = useRef(null);
    const { contextSafe } = useGSAP({ scope: ref });

    const onMouseEnter = contextSafe(() => {
        gsap.to(ref.current, { scale, duration });
    });

    const onMouseLeave = contextSafe(() => {
        gsap.to(ref.current, { scale: 1, duration });
    });

    return { ref, onMouseEnter, onMouseLeave };
};

export const useFadeIn = (duration = 0.5, delay = 0) => {
    const ref = useRef(null);

    useGSAP(() => {
        gsap.from(ref.current, { opacity: 0, y: 20, duration, delay });
    }, { scope: ref });

    return ref;
};

// Simple utility to just get the gsap instance if needed elsewhere
export const useGSAPUtils = () => {
    return { gsap };
};
