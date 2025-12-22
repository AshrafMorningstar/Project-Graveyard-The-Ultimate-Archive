/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Neural BMI Analyzer - Created by Ashraf Morningstar */
/* GitHub: https://github.com/AshrafMorningstar */

console.log('Neural BMI Analyzer loaded successfully!');
console.log('Created by Ashraf Morningstar');
console.log('https://github.com/AshrafMorningstar');

document.addEventListener('DOMContentLoaded', () => {
    const appContent = `
        <div class="bmi-container">
            <div class="input-grid">
                <div class="input-group">
                    <label for="weight">⚖️ Weight (kg)</label>
                    <input type="number" id="weight" placeholder="Enter weight" step="0.1" min="1">
                </div>
                <div class="input-group">
                    <label for="height">📏 Height (cm)</label>
                    <input type="number" id="height" placeholder="Enter height" step="0.1" min="1">
                </div>
            </div>
            <button onclick="calculateBMI()" class="calc-btn">Analyze BMI 💪</button>
            <div id="result" class="result-container" style="display:none;"></div>
        </div>
    `;
    
    document.getElementById('app').innerHTML = appContent;
});

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const resultDiv = document.getElementById('result');
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('⚠️ Please enter valid weight and height!');
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(1);
    let category = '';
    let color = '';
    let emoji = '';
    let advice = '';
    let healthRisk = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3b82f6';
        emoji = '📉';
        advice = 'Consider consulting a nutritionist for a healthy weight gain plan.';
        healthRisk = 'Low';
    } else if (bmi < 25) {
        category = 'Normal Weight';
        color = '#10b981';
        emoji = '✅';
        advice = 'Great! Maintain your healthy lifestyle with balanced diet and exercise.';
        healthRisk = 'Very Low';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f59e0b';
        emoji = '⚠️';
        advice = 'Consider a balanced diet and regular exercise to reach healthy weight.';
        healthRisk = 'Moderate';
    } else {
        category = 'Obese';
        color = '#ef4444';
        emoji = '🔴';
        advice = 'Consult a healthcare professional for personalized advice and support.';
        healthRisk = 'High';
    }
    
    const idealWeightMin = (18.5 * height * height).toFixed(1);
    const idealWeightMax = (24.9 * height * height).toFixed(1);
    const weightDiff = weight - idealWeightMax;
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="bmi-display" style="border-color: ${color};">
            <div class="bmi-emoji">${emoji}</div>
            <div class="bmi-value" style="color: ${color};">${bmi}</div>
            <div class="bmi-category" style="color: ${color};">${category}</div>
        </div>
        
        <div class="bmi-scale">
            <div class="scale-bar">
                <div class="scale-marker" style="left: ${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%;"></div>
            </div>
            <div class="scale-labels">
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40</span>
            </div>
        </div>
        
        <div class="health-insights">
            <h4>🏥 Health Insights</h4>
            <div class="insight-row">
                <span>Health Risk:</span>
                <strong style="color: ${color};">${healthRisk}</strong>
            </div>
            <div class="insight-row">
                <span>Your Weight:</span>
                <strong>${weight} kg</strong>
            </div>
            <div class="insight-row">
                <span>Your Height:</span>
                <strong>${(height * 100).toFixed(1)} cm</strong>
            </div>
            <div class="insight-row">
                <span>Ideal Weight Range:</span>
                <strong>${idealWeightMin} - ${idealWeightMax} kg</strong>
            </div>
            ${weightDiff > 0 ? `
            <div class="insight-row highlight">
                <span>Weight to Lose:</span>
                <strong>${weightDiff.toFixed(1)} kg</strong>
            </div>
            ` : ''}
            <div class="advice-box">
                <p>💡 ${advice}</p>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .bmi-container { max-width: 700px; margin: 0 auto; }
        .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
        .calc-btn {
            width: 100%;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            margin-top: 1.5rem;
            background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
            border: none;
            border-radius: 12px;
            color: white;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.3s ease;
        }
        .calc-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0, 210, 255, 0.6); }
        .result-container { margin-top: 2rem; animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .bmi-display {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            border: 3px solid;
            margin-bottom: 2rem;
        }
        .bmi-emoji { font-size: 4rem; margin-bottom: 1rem; }
        .bmi-value { font-size: 4rem; font-weight: 800; line-height: 1; }
        .bmi-category { font-size: 1.5rem; font-weight: 600; margin-top: 1rem; }
        .bmi-scale { margin: 2rem 0; }
        .scale-bar {
            height: 20px;
            background: linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444);
            border-radius: 10px;
            position: relative;
        }
        .scale-marker {
            position: absolute;
            top: -5px;
            width: 4px;
            height: 30px;
            background: white;
            border-radius: 2px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            transform: translateX(-50%);
        }
        .scale-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: #999;
        }
        .health-insights {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 15px;
        }
        .health-insights h4 { margin-bottom: 1rem; text-align: center; }
        .insight-row {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .insight-row.highlight {
            background: rgba(239, 68, 68, 0.2);
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            border: none;
        }
        .advice-box {
            background: rgba(102, 126, 234, 0.2);
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            border-left: 4px solid #667eea;
        }
    `;
    document.head.appendChild(style);
}