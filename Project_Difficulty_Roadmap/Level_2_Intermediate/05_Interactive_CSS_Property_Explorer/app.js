/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Interactive CSS Property Explorer
   Level: Intermediate
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const rotateX = ref(30);
        const rotateY = ref(45);
        const rotateZ = ref(0);
        
        const padding = ref(0);
        const borderRadius = ref(0);
        const opacity = ref(0.9);
        const scale = ref(1);

        const containerStyles = computed(() => ({
            transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) rotateZ(${rotateZ.value}deg) scale(${scale.value})`
        }));

        const boxStyles = computed(() => ({
            padding: `${padding.value}px`,
            borderRadius: `${borderRadius.value}%`,
            opacity: opacity.value
        }));

        return {
            rotateX, rotateY, rotateZ,
            padding, borderRadius, opacity, scale,
            containerStyles, boxStyles
        };
    }
}).mount('#app');
