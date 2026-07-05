// src/main.js

const appContainer = document.getElementById('app');

// Der Navigations-Stapel (Speichert die Funktionen, die die Seiten rendern)
const navHistory = [];

// Unsere zentrale Funktion, um eine neue Seite zu öffnen
function navigateTo(renderFunction) {
  // 1. Wir merken uns die aktuelle Seite auf dem Stapel
  navHistory.push(renderFunction);
  
  // 2. Wir führen die Funktion aus, um die neue Seite anzuzeigen
  renderFunction();
}

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

  // NEU & DYNAMISCH: Klick-Events für ALLE Kacheln (.card) registrieren
  const allTiles = document.querySelectorAll('.card');
  allTiles.forEach((kachel) => {
    kachel.addEventListener('click', () => {

      // HINWEIS: "kachel" ist das aktuelle .card-Element.
      // 1. // Wir holen uns daraus den Text des innenliegenden <h3>-Tags, um den Modulnamen zu erfahren.
      const modulName = kachel.querySelector('h3').textContent;
      
      // 2. Den Header-Titel dynamisch anpassen
      appTitle.textContent = modulName;
      
      // 3. Späterer Platzhalter: Hier laden wir dann die echte Modul-Ansicht
      appContainer.innerHTML = `<div style="padding: 20px; text-align: center;">Hier öffnet sich bald das Modul: <strong>${modulName}</strong></div>`;
    });
  });
}

// Event-Listener für die Footer-Buttons (Android-Navigation)
document.getElementById('btn-home').addEventListener('click', () => {
  renderDashboard(); // Bringt uns immer zurück zum Start
});

document.getElementById('btn-back').addEventListener('click', () => {
  // Wenn mehr als eine Seite im Verlauf ist, können wir zurückgehen
  if (navHistory.length > 1) {
    navHistory.pop(); // Die aktuelle Seite vom Stapel herunterschmeißen
    
    // Die jetzt oberste Seite vom Stapel holen, ohne sie zu löschen
    const vorherigeSeite = navHistory[navHistory.length - 1]; 
    vorherigeSeite(); // Diese Seite wieder anzeigen
  } else {
    // Wenn wir schon auf dem Dashboard sind, bringt uns Zurück nirgends mehr hin
    console.log("Bereits auf der obersten Ebene (Dashboard).");
  }
});

// Event-Listener für das Login-Icon im Header
document.getElementById('btn-login').addEventListener('click', () => {
  alert('Supabase-Login wird hier später geladen!');
});

// Suchfunktion im Footer
document.getElementById('search-input').addEventListener('input', (event) => {
  const eingabeSearchInput = event.target.value.toLowerCase();
  const kacheln = document.querySelectorAll('.card');

  kacheln.forEach((kachel) => {
    const kachelText = kachel.querySelector('h3').textContent.toLowerCase();

    if (kachelText.includes(eingabeSearchInput)) {
      kachel.style.display = 'block';
    } else {
      kachel.style.display = 'none';
    }
  });
});

// Zum Start der App das Dashboard auf den Stapel legen
navigateTo(renderDashboard);