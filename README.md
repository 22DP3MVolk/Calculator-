# Calculator-


Mēģināju dabūt jaunu kalkulatoru kuru uztaisīju majās un atsutiju caur epastu
<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulators ar Vēsturi</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100dvh;
            margin: 0;
            background-color: #2c2c2c;
            color: white;
        }

        .calculator {
            background-color: #333;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 300px;
        }

        .display {
            width: 100%;
            height: 50px;
            text-align: right;
            font-size: 50px;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #444;
            border-radius: 5px;
            background-color: #222;
            color: white;
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }

        .buttons button {
            padding: 20px;
            font-size: 20px;
            border: none;
            background-color: #444;
            color: white;
            cursor: pointer;
            border-radius: 5px;
        }

        .buttons button:hover {
            background-color: #666;
        }

        .buttons button:active {
            background-color: #888;
        }

        .buttons button.clear {
            background-color: #555;
        }

        .buttons button.clear:hover {
            background-color: #777;
        }

        .history {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #444;
        }

        .history ul {
            list-style-type: none;
            padding: 0;
        }

        .history li {
            margin-bottom: 5px;
        }

        .history button {
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            padding: 5px 10px;
        }

        .history button:hover {
            background-color: #218838;
        }

        .history button:active {
            background-color: #1e7e34;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" class="display" disabled>
        <div class="buttons">
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('/')">/</button>

            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('*')">*</button>

            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="appendToDisplay('-')">-</button>

            <button onclick="appendToDisplay('0')">0</button>
            <button onclick="appendToDisplay('.')">.</button>
            <button onclick="calculate()">=</button>
            <button onclick="appendToDisplay('+')">+</button>

            <button class="clear" onclick="clearDisplay()">AC</button>
            <button class="clear" onclick="deleteLastChar()">←</button>
        </div>

        <div class="history">
            <h3>Vēsture</h3>
            <ul id="history-list"></ul>
            <button onclick="clearHistory()">Dzēst vēsturi</button>
        </div>
    </div>

    <script>
        // Global variables
        let history = JSON.parse(localStorage.getItem('history')) || [];

        // Display the history on page load
        updateHistory();

        // Append character to the display
        function appendToDisplay(value) {
            document.getElementById('display').value += value;
        }

        // Clear the display
        function clearDisplay() {
            document.getElementById('display').value = '';
        }

        // Delete the last character from the display
        function deleteLastChar() {
            let display = document.getElementById('display');
            display.value = display.value.slice(0, -1);
        }

        // Perform the calculation
        function calculate() {
            let expression = document.getElementById('display').value;
            try {
                let result = eval(expression);
                document.getElementById('display').value = result;
                addHistory(expression + ' = ' + result);
            } catch (e) {
                document.getElementById('display').value = 'Error';
            }
        }

        // Add calculation to history
        function addHistory(entry) {
            history.push(entry);
            localStorage.setItem('history', JSON.stringify(history));
            updateHistory();
        }

        // Update the history section
        function updateHistory() {
            let historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            history.forEach((entry, index) => {
                let li = document.createElement('li');
                li.innerHTML = `${entry} <button onclick="deleteHistoryEntry(${index})">Dzēst</button>`;
                historyList.appendChild(li);
            });
        }

        // Delete a specific history entry
        function deleteHistoryEntry(index) {
            history.splice(index, 1);
            localStorage.setItem('history', JSON.stringify(history));
            updateHistory();
        }

        // Clear all history
        function clearHistory() {
            history = [];
            localStorage.setItem('history', JSON.stringify(history));
            updateHistory();
        }
    </script>
</body>
</html>
