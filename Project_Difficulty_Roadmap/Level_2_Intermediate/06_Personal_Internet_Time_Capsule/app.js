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

/* 
   Project: Personal Internet Time Capsule
   Level: Intermediate
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

// Mock Data representing browsing history
const mockHistory = [
    { domain: "github.com", visits: 156, category: "Dev", time: 45 },
    { domain: "stackoverflow.com", visits: 89, category: "Dev", time: 30 },
    { domain: "youtube.com", visits: 240, category: "Media", time: 120 },
    { domain: "medium.com", visits: 45, category: "Reading", time: 15 },
    { domain: "figma.com", visits: 78, category: "Design", time: 60 },
    { domain: "google.com", visits: 500, category: "Search", time: 80 },
    { domain: "discord.com", visits: 310, category: "Social", time: 90 },
    { domain: "css-tricks.com", visits: 34, category: "Dev", time: 10 },
    { domain: "netflix.com", visits: 12, category: "Media", time: 40 },
    { domain: "news.ycombinator.com", visits: 67, category: "Reading", time: 20 },
    { domain: "twitter.com", visits: 180, category: "Social", time: 55 },
    { domain: "dribbble.com", visits: 45, category: "Design", time: 25 },
];

const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.6;
const colors = {
    "Dev": "#38bdf8",
    "Media": "#f472b6",
    "Reading": "#a78bfa",
    "Design": "#fbbf24",
    "Search": "#94a3b8",
    "Social": "#4ade80"
};

const vizBtn = document.getElementById('visualize-btn');
const vizArea = document.getElementById('visualization-area');
const siteCount = document.getElementById('site-count');
const hourCount = document.getElementById('hour-count');

vizBtn.addEventListener('click', generateArtifact);

function generateArtifact() {
    // Clear previous
    vizArea.innerHTML = '';
    
    // Update Stats
    const totalVisits = mockHistory.reduce((acc, curr) => acc + curr.visits, 0);
    const totalHours = mockHistory.reduce((acc, curr) => acc + curr.time, 0);
    
    animateValue(siteCount, 0, totalVisits, 1000);
    animateValue(hourCount, 0, totalHours, 1000);

    // Create SVG
    const svg = d3.select("#visualization-area")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .style("background", "transparent");

    // Simulation
    const simulation = d3.forceSimulation(mockHistory)
        .force("charge", d3.forceManyBody().strength(5))
        .force("collide", d3.forceCollide().radius(d => Math.sqrt(d.visits) * 2 + 5)) // Radius prop to visits
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    // Nodes
    const nodes = svg.append("g")
        .selectAll("circle")
        .data(mockHistory)
        .join("circle")
        .attr("r", 0) // Start small for animation
        .attr("fill", d => colors[d.category])
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("opacity", 0.8)
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`
                <strong>${d.domain}</strong><br/>
                Visits: ${d.visits}<br/>
                Category: ${d.category}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
        });

    // Labels
    const labels = svg.append("g")
        .selectAll("text")
        .data(mockHistory)
        .join("text")
        .text(d => d.visits > 50 ? d.domain.split('.')[0] : '') // Only label big ones
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#fff")
        .attr("pointer-events", "none")
        .style("opacity", 0);

    // Run Sim
    simulation.on("tick", () => {
        nodes
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
            
        labels
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    // Intro Animation
    nodes.transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr("r", d => Math.sqrt(d.visits) * 2);

    labels.transition()
        .delay(1500)
        .duration(500)
        .style("opacity", 1);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
