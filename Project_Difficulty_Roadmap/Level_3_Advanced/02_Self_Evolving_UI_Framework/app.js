/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Self-Evolving UI Framework
   Level: Advanced
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

// --- Genetic Algorithm Constants ---
const POPULATION_SIZE = 5;
const MUTATION_RATE = 0.2;

// --- Gene Definitions ---
const TRAITS = {
    backgroundColor: ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047'],
    borderRadius: ['0px', '4px', '8px', '20px', '50px'],
    padding: ['10px', '15px', '20px', '30px'],
    fontSize: ['14px', '16px', '18px', '24px'],
    fontWeight: ['normal', 'bold'],
    boxShadow: ['none', '0 4px 6px rgba(0,0,0,0.1)', '0 10px 20px rgba(0,0,0,0.3)', '0 0 15px rgba(255,255,255,0.1)']
};

// --- State ---
let population = [];
let generation = 1;
let bestFitness = 0;

// --- DOM Elements ---
const container = document.getElementById('component-container');
const genCount = document.getElementById('gen-count');
const bestFitDisplay = document.getElementById('best-fit');
const genomeViewer = document.getElementById('genome-viewer');
const evolveBtn = document.getElementById('evolve-btn');

// --- Component Class ---
class EvoComponent {
    constructor(dna = null) {
        this.dna = dna || this.randomDNA();
        this.fitness = 0; // Clicks count as fitness
        this.element = null;
    }

    randomDNA() {
        const dna = {};
        for (const [trait, options] of Object.entries(TRAITS)) {
            dna[trait] = options[Math.floor(Math.random() * options.length)];
        }
        return dna;
    }

    render() {
        const el = document.createElement('div');
        el.className = 'evo-component';
        el.innerText = "Click Me if I'm Attractive!";
        
        // Apply Genotype to Phenotype (Styles)
        Object.assign(el.style, this.dna);
        // Ensure text contrast
        el.style.color = '#fff';

        el.addEventListener('click', () => {
            this.fitness++;
            this.updatefitnessUI();
        });

        el.addEventListener('mouseover', () => {
            genomeViewer.textContent = JSON.stringify(this.dna, null, 2);
        });

        this.element = el;
        return el;
    }

    updatefitnessUI() {
        // Find Local Best
        if (this.fitness > bestFitness) {
            bestFitness = this.fitness;
            bestFitDisplay.innerText = bestFitness;
        }
    }
}

// --- Evolution Logic ---

function initPopulation() {
    population = [];
    container.innerHTML = '';
    
    for (let i = 0; i < POPULATION_SIZE; i++) {
        const comp = new EvoComponent();
        population.push(comp);
        container.appendChild(comp.render());
    }
}

function evolve() {
    // 1. Selection: Sort by fitness
    population.sort((a, b) => b.fitness - a.fitness);
    
    // Elitism: Keep best 2
    const parents = population.slice(0, 2);
    
    // 2. Crossover & Mutation
    const nextGen = [...parents]; // Keep elites
    
    // Fill rest of population
    while (nextGen.length < POPULATION_SIZE) {
        // Mate the top 2
        const childDNA = crossover(parents[0].dna, parents[1].dna);
        const mutatedDNA = mutate(childDNA);
        
        // New offspring reset fitness (but carry good genes)
        nextGen.push(new EvoComponent(mutatedDNA));
    }

    // 3. Update Generation
    population = nextGen;
    generation++;
    genCount.innerText = generation;
    
    // Re-render
    container.innerHTML = '';
    population.forEach(comp => {
        // Reset fitness count for new round (to test if they are STILL good)
        // Or keep accumulative? Let's reset to see immediate preference of new traits
        comp.fitness = 0; 
        container.appendChild(comp.render());
    });
}

function crossover(dna1, dna2) {
    const newDNA = {};
    for (const key of Object.keys(dna1)) {
        // 50/50 chance from mom or dad
        newDNA[key] = Math.random() > 0.5 ? dna1[key] : dna2[key];
    }
    return newDNA;
}

function mutate(dna) {
    const mutated = { ...dna };
    for (const [key, options] of Object.entries(TRAITS)) {
        if (Math.random() < MUTATION_RATE) {
            mutated[key] = options[Math.floor(Math.random() * options.length)];
        }
    }
    return mutated;
}

// --- Init ---
evolveBtn.addEventListener('click', evolve);
initPopulation();
