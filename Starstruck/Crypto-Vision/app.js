/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Charts
  const ctx = document.getElementById("marketChart").getContext("2d");

  // Gradient for Line Chart
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(108, 92, 231, 0.5)");
  gradient.addColorStop(1, "rgba(108, 92, 231, 0)");

  const marketChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Portfolio Value",
          data: [30000, 35000, 32000, 38000, 42000, 40000, 45000],
          borderColor: "#6c5ce7",
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#fff",
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#b2bec3" },
        },
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false },
          ticks: {
            color: "#b2bec3",
            callback: (val) => "$" + val / 1000 + "k",
          },
        },
      },
    },
  });

  // Simulating Live Price Updates
  function updatePrices() {
    const assets = [
      { id: "price-btc", base: 45000, var: 200 },
      { id: "price-eth", base: 3100, var: 20 },
      { id: "price-sol", base: 120, var: 2 },
    ];

    assets.forEach((asset) => {
      const element = document.getElementById(asset.id);
      if (element) {
        const fluctuation = (Math.random() - 0.5) * asset.var;
        const newPrice = asset.base + fluctuation;
        element.innerText =
          "$" +
          newPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

        // Color flash effect could go here
        element.style.color = fluctuation > 0 ? "#00b894" : "#d63031";
        setTimeout(() => {
          element.style.color = "#fff";
        }, 500);
      }
    });
  }

  setInterval(updatePrices, 3000);
});
