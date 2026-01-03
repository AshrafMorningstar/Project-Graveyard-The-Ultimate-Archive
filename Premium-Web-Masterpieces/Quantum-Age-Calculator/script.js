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

/* Quantum Age Calculator - Created by Ashraf Morningstar */
/* GitHub: https://github.com/AshrafMorningstar */

console.log("Quantum Age Calculator loaded successfully!");
console.log("Created by Ashraf Morningstar");
console.log("https://github.com/AshrafMorningstar");

document.addEventListener("DOMContentLoaded", () => {
  const appContent = `
        <div class="calculator-container">
            <div class="input-group">
                <label for="dob">📅 Select Your Date of Birth</label>
                <input type="date" id="dob" max="${
                  new Date().toISOString().split("T")[0]
                }">
            </div>
            <button onclick="calculateAge()" class="calc-btn">Calculate My Age ✨</button>
            <div id="result" class="result-container" style="display:none;"></div>
        </div>
    `;

  document.getElementById("app").innerHTML = appContent;
});

function calculateAge() {
  const dobInput = document.getElementById("dob");
  const resultDiv = document.getElementById("result");

  if (!dobInput.value) {
    alert("⚠️ Please select your date of birth!");
    return;
  }

  const dob = new Date(dobInput.value);
  const now = new Date();

  if (dob > now) {
    alert("⚠️ Date cannot be in the future!");
    return;
  }

  // Calculate age components
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate additional stats
  const totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Calculate next birthday
  const nextBirthday = new Date(
    now.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday - now) / (1000 * 60 * 60 * 24)
  );

  // Display results with animation
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
        <h3 style="text-align:center; margin-bottom:2rem; font-size:1.8rem;">🎂 Your Cosmic Age</h3>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
            <div class="stat-box">
                <div class="stat-value">${years}</div>
                <div class="stat-label">Years</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${months}</div>
                <div class="stat-label">Months</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${days}</div>
                <div class="stat-label">Days</div>
            </div>
        </div>
        
        <div class="detailed-stats">
            <h4 style="margin-bottom:1rem; text-align:center;">📊 Detailed Statistics</h4>
            <div class="stat-row">
                <span>Total Days Lived:</span>
                <strong>${totalDays.toLocaleString()}</strong>
            </div>
            <div class="stat-row">
                <span>Total Hours:</span>
                <strong>${totalHours.toLocaleString()}</strong>
            </div>
            <div class="stat-row">
                <span>Total Minutes:</span>
                <strong>${totalMinutes.toLocaleString()}</strong>
            </div>
            <div class="stat-row">
                <span>Total Seconds:</span>
                <strong>${totalSeconds.toLocaleString()}</strong>
            </div>
            <div class="stat-row highlight">
                <span>🎉 Next Birthday In:</span>
                <strong>${daysUntilBirthday} days</strong>
            </div>
        </div>
    `;

  // Add CSS for result styling
  const style = document.createElement("style");
  style.textContent = `
        .calculator-container { max-width: 600px; margin: 0 auto; }
        .calc-btn {
            width: 100%;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            margin-top: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            color: white;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .calc-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .result-container {
            margin-top: 2rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .stat-box {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: 15px;
            text-align: center;
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        .stat-box:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
        }
        .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .stat-label {
            font-size: 0.9rem;
            color: #ccc;
            margin-top: 0.5rem;
        }
        .detailed-stats {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 15px;
            margin-top: 1.5rem;
        }
        .stat-row {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stat-row.highlight {
            background: rgba(102, 126, 234, 0.2);
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            border: none;
        }
    `;
  document.head.appendChild(style);
}
