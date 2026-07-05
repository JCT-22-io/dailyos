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

// Event-Listener für das Login-Icon im Header
document.getElementById('btn-login').addEventListener('click', () => {
  alert('Supabase-Login wird hier später geladen!');
});

document.getElementById('search-input').addEventListener('input', (event) => {
  // 1. Wir holen uns den aktuellen Suchbegriff in Kleinbuchstaben
  const eingabeSearchInput = event.target.value.toLowerCase();
  
  // 2. Wir holen uns die ALLERNEUESTE Liste der Kacheln
  const kacheln = document.querySelectorAll('.card');

  // 3. Wir gehen jede Kachel durch
  kacheln.forEach((kachel) => {
    // JETZT NEU: Nur querySelector (ohne "All"), um die eine Überschrift zu greifen
    const kachelText = kachel.querySelector('h3').textContent.toLowerCase();

    // 4. Prüfen: Ist der Suchbegriff im Kacheltext enthalten?
    if (kachelText.includes(eingabeSearchInput)) {
      kachel.style.display = 'block'; // Korrigiert: display statt diyplay
    } else {
      kachel.style.display = 'none';  // Korrigiert: display statt diyplay
    }
  });
});

// Die App starten und das Dashboard zeigen
renderDashboard();