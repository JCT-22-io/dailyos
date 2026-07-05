// src/main.js

const appContainer = document.getElementById('app');
const appTitle = document.getElementById('app-title');

// Funktion, um das Haupt-Dashboard anzuzeigen
function renderDashboard() {
  // 1. Header auf den Startnamen setzen
  appTitle.textContent = 'dailyOS';

  // 2. Die Kacheln in den Hauptbereich rendern
  appContainer.innerHTML = `
    <div class="grid-container">
      
      <div class="card" id="tile-bread">
        <span class="icon">🍞</span>
        <h3>Teigrechner</h3>
      </div>
      
      <div class="card" id="tile-coffee">
        <span class="icon">☕</span>
        <h3>Kaffeerechner</h3>
      </div>
      
    </div>
  `;

  // Klick-Events für den ersten Test
  document.getElementById('tile-bread').addEventListener('click', () => {
    alert('Wechsel zum Teigrechner-Modul');
  });

  document.getElementById('tile-coffee').addEventListener('click', () => {
    alert('Wechsel zum Kaffeerechner-Modul');
  });
}

// Event-Listener für die Footer-Buttons (Android-Navigation)
document.getElementById('btn-home').addEventListener('click', () => {
  renderDashboard(); // Bringt uns immer zurück zum Start
});

document.getElementById('btn-back').addEventListener('click', () => {
  alert('Zurück-Funktion wird im nächsten Schritt gebaut!');
});

// Die App starten und das Dashboard zeigen
renderDashboard();