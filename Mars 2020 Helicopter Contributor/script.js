/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {
  const igniteBtn = document.getElementById("ignite-btn");
  const terminalSection = document.getElementById("terminal-section");
  const terminalOutput = document.getElementById("terminal-output");

  const flightLogs = [
    {
      msg: "System initialization sequence started...",
      type: "normal",
      delay: 500,
    },
    {
      msg: "Checking rotor blade integrity... OK",
      type: "success",
      delay: 1200,
    },
    {
      msg: "Battery systems at 100% (Solar verified)",
      type: "success",
      delay: 1800,
    },
    {
      msg: "Establishing uplink with Perseverance Rover...",
      type: "warn",
      delay: 2500,
    },
    {
      msg: "Uplink established. Signal strength: Strong",
      type: "success",
      delay: 3500,
    },
    {
      msg: "Loading flight plan: FLIGHT_73_RECON",
      type: "normal",
      delay: 4200,
    },
    { msg: "Gyro calibration complete.", type: "normal", delay: 4800 },
    { msg: "Spin up rotors to 2400 RPM...", type: "warn", delay: 5500 },
    {
      msg: "Takeoff confirmed! Altitude increasing...",
      type: "success",
      delay: 6500,
    },
    {
      msg: "Ingenuity is airborne on Mars. Status: LEGENDARY.",
      type: "success",
      delay: 7500,
    },
  ];

  igniteBtn.addEventListener("click", () => {
    // Scroll to terminal if hidden
    terminalSection.style.display = "block";
    terminalSection.scrollIntoView({ behavior: "smooth" });

    // Clear previous output
    terminalOutput.innerHTML = "";

    // Disable button
    igniteBtn.disabled = true;
    igniteBtn.innerText = "SEQUENCE RUNNING...";
    igniteBtn.style.background = "#555";

    let totalDelay = 0;

    flightLogs.forEach((log) => {
      setTimeout(() => {
        const line = document.createElement("div");
        line.className = `log-entry ${log.type}`;
        const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
        line.innerHTML = `<span style="opacity:0.5">[${timestamp}]</span> ${log.msg}`;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }, log.delay);
      totalDelay = Math.max(totalDelay, log.delay);
    });

    setTimeout(() => {
      igniteBtn.disabled = false;
      igniteBtn.innerText = "RE-INITIATE SEQUENCE";
      igniteBtn.style.background = ""; // Reset
    }, totalDelay + 1000);
  });
});
