// Generate random data and simulate Simpson's Paradox
let data = {};
let simpsonExists = false;

// Initialize the game
function generateData() {
    // Randomly decide whether to create a Simpson's Paradox case or not
    simpsonExists = Math.random() < 0.5;

    // Example: Create different cases where Simpson's Paradox exists or does not exist
    if (simpsonExists) {
        // Case 1: Simpson's Paradox exists (Aggregated suggests drug works, but subgroups say otherwise)
        const caseIndex = Math.floor(Math.random() * 2); // Select between case 0 and case 1
        if (caseIndex === 0) {
            data = {
                aggregated: { treated: 50, control: 40 },
                groupA: { treated: 60, control: 70 },
                groupB: { treated: 20, control: 30 }
            };
        } else if (caseIndex === 1) {
            // Case 2: Simpson's Paradox exists (Inverse situation)
            data = {
                aggregated: { treated: 60, control: 50 },
                groupA: { treated: 70, control: 80 },
                groupB: { treated: 30, control: 40 }
            };
        } else {
            // Case 3: Simpson's Paradox exists (different recovery rates)
            data = {
                aggregated: { treated: 55, control: 45 },
                groupA: { treated: 65, control: 75 },
                groupB: { treated: 25, control: 35 }
            };
        }
    } else {
        // Case 1: Simpson's Paradox does not exist (Consistent trends in aggregated and subgroups)
        const caseIndex = Math.floor(Math.random() * 2); // Select between case 0 and case 1
        if (caseIndex === 0) {
            data = {
                aggregated: { treated: 50, control: 40 },
                groupA: { treated: 60, control: 50 },
                groupB: { treated: 40, control: 30 }
            };
        } else if (caseIndex === 1) {
            // Case 2: Simpson's Paradox does not exist (Both subgroups and overall data agree)
            data = {
                aggregated: { treated: 55, control: 45 },
                groupA: { treated: 65, control: 55 },
                groupB: { treated: 50, control: 40 }
            };
        } else {
            // Case 3: No paradox, consistent across groups
            data = {
                aggregated: { treated: 60, control: 50 },
                groupA: { treated: 70, control: 60 },
                groupB: { treated: 55, control: 45 }
            };
        }
    }

    // Display the data in a table
    populateTable();
}

// Populate the data table
function populateTable() {
    const table = document.getElementById('data-table');
    table.innerHTML = `
        <tr>
            <th>Group</th>
            <th>Treated Recovery Rate (%)</th>
            <th>Control Recovery Rate (%)</th>
        </tr>
        <tr>
            <td>Aggregated</td>
            <td>${data.aggregated.treated}</td>
            <td>${data.aggregated.control}</td>
        </tr>
        <tr>
            <td>Group A</td>
            <td>${data.groupA.treated}</td>
            <td>${data.groupA.control}</td>
        </tr>
        <tr>
            <td>Group B</td>
            <td>${data.groupB.treated}</td>
            <td>${data.groupB.control}</td>
        </tr>
    `;
}

// Handle the user's answer
function submitAnswer(answer) {
    const resultSection = document.getElementById('result-section');
    const resultText = document.getElementById('result-text');
    const explanationText = document.getElementById('explanation-text');
    const restartButton = document.getElementById('restart-button');

    resultSection.classList.remove('hidden');

    if (answer === simpsonExists) {
        resultText.innerText = "Congratulations! You spotted it correctly!";
        resultText.style.color = 'green';
        explanationText.classList.add('hidden');
    } else {
        resultText.innerText = "Oops! That's incorrect.";
        resultText.style.color = 'red';

        explanationText.classList.remove('hidden');
        if (simpsonExists) {
            explanationText.innerText = "Simpson's Paradox exists here because the aggregated data shows a different trend than the subgroups.";
        } else {
            explanationText.innerText = "There is no Simpson's Paradox here. Both the aggregated and subgroup data are consistent.";
        }
    }

    restartButton.classList.remove('hidden');
}

// Restart the game
function restartGame() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden');
    generateData();
}

// Generate initial data on page load
window.onload = generateData;
