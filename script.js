let history = JSON.parse(localStorage.getItem('history')) || [];

function appendToInput(value) {
    document.getElementById('input').value += value;
}

function calculate() {
    const input = document.getElementById('input').value;
    try {
        const result = eval(input);
        document.getElementById('input').value = result;
        addToHistory(`${input} = ${result}`);
    } catch (error) {
        alert('Kļūda aprēķinā!');
    }
}

function clearInput() {
    document.getElementById('input').value = '';
}

function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = entry;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Dzēst';
        deleteButton.onclick = () => deleteHistoryEntry(index);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    localStorage.removeItem('history');
    update
