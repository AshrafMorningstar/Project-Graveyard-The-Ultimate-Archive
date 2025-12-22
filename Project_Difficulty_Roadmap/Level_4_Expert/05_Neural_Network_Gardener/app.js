/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Neural Network Gardener
   Level: Expert
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const width = window.innerWidth;
const height = window.innerHeight;
const nodeCountDisplay = document.getElementById('node-count');
const efficiencyDisplay = document.getElementById('efficiency');

let nodes = [];
let links = [];
let simulation;

function initGarden() {
    // Generate Dense Graph
    nodes = d3.range(50).map(i => ({ id: i, group: Math.floor(i / 10) }));
    links = [];
    
    // Connect heavily
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.85) { // 15% connection chance
                links.push({ source: i, target: j, value: Math.random() });
            }
        }
    }

    render();
}

function render() {
    document.getElementById('garden-viz').innerHTML = '';
    
    updateStats();

    const svg = d3.select("#garden-viz")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .attr("stroke-width", 1.5)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("class", "synapse");

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 8)
        .attr("fill", d => d3.schemeCategory10[d.group])
        .call(drag(simulation))
        .on("click", pruneNode); // Interaction

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
}

function pruneNode(event, d) {
    // Remove node and connected links
    nodes = nodes.filter(n => n.id !== d.id);
    links = links.filter(l => l.source.id !== d.id && l.target.id !== d.id);
    
    // Re-render
    render();
}

function updateStats() {
    nodeCountDisplay.innerText = nodes.length;
    
    // Fake efficiency metric: Less nodes = Higher efficiency (to a point)
    const optimal = 20;
    const diff = Math.abs(nodes.length - optimal);
    const eff = Math.max(0, 100 - (diff * 2));
    efficiencyDisplay.innerText = `${eff}%`;
}

// Drag behavior
function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

document.getElementById('reset-btn').addEventListener('click', initGarden);

initGarden();
