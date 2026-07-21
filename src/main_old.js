// src/main.js

// ==========================================
// 1. GLOBALE VARIABLEN & SEITEN-STAPEL (History)
// ==========================================
const appContainer = document.getElementById('app');
const appTitle = document.getElementById('app-title');
const navHistory = [];

// Zentrale Funktion zum Navigieren (Legt die Seite auf den Stapel)
function navigateTo(renderFunction) {
  navHistory.push(renderFunction);
  renderFunction();
}


// ==========================================
// 2. DIE RENDERING-FUNKTIONEN (Die einzelnen Seiten)
// ==========================================

// Haupt-Dashboard (Startseite)
function renderDashboard() {
  appTitle.textContent = 'dailyOS';
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

  // Zuordnungsliste: Welche Kachel-ID öffnet welche Funktion?
  const modulAnsichten = {
    'tile-bread': renderTeigrechner,
    'tile-coffee': renderKaffeerechner
  };

  // DYNAMISCHE SCHLEIFE: Klick-Events für alle Kacheln registrieren
  const allTiles = document.querySelectorAll('.card');
  allTiles.forEach((kachel) => {
    kachel.addEventListener('click', () => {
      // ID der geklickten Kachel holen (z.B. "tile-bread")
      const kachelId = kachel.id;
      
      // Passende Funktion aus der Zuordnungsliste holen
      const zielFunktion = modulAnsichten[kachelId];
      
      if (zielFunktion) {
        navigateTo(zielFunktion); // Seite wechseln und auf Stapel legen
      } else {
        console.error("Keine Funktion für diese Kachel-ID gefunden:", kachelId);
      }
    });
  });
}

// Modul: Teigrechner Hauptseite
function renderTeigrechner() {
  appTitle.textContent = 'Teigrechner';
  appContainer.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>🍞 Teigrechner Hauptmenü</h2>
      <p>Hier kommen bald deine Teig-Optionen hin.</p>
    </div>
  `;
}

// Modul: Kaffeerechner Hauptseite
function renderKaffeerechner() {
  appTitle.textContent = 'Kaffeerechner';
  appContainer.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>☕ Kaffeerechner Hauptmenü</h2>
      <p>Hier wählen wir später French Press, V60 etc.</p>
    </div>
  `;
}


// ==========================================
// 3. NAVIGATION (FOOTER & HEADER ELEMENTE)
// ==========================================

// Zurück-Button (Das "cd .." Prinzip über den Stapel)
document.getElementById('btn-back').addEventListener('click', () => {
  if (navHistory.length > 1) {
    navHistory.pop(); // Die aktuelle Seite vom Stapel werfen
    const vorherigeSeite = navHistory[navHistory.length - 1]; // Die Seite darunter holen
    vorherigeSeite(); // Und anzeigen!
  } else {
    console.log("Bereits auf der obersten Ebene (Dashboard).");
  }
});

// Home-Button (Löscht den Verlauf und springt ganz zum Anfang)
document.getElementById('btn-home').addEventListener('click', () => {
  navHistory.length = 0; // Gesamten Stapel leeren
  navigateTo(renderDashboard);
});

// Login-Icon im Header
document.getElementById('btn-login').addEventListener('click', () => {
  alert('Supabase-Login wird hier später geladen!');
});

// Suchfunktion im Footer (Filtert die Kacheln auf dem Dashboard)
document.getElementById('search-input').addEventListener('input', (event) => {
  const eingabeSearchInput = event.target.value.toLowerCase();
  const kacheln = document.querySelectorAll('.card');

  kacheln.forEach((kachel) => {
    const kachelText = kachel.querySelector('h3').textContent.toLowerCase();
    // Nutzt eine Kurzschreibweise (Ternary Operator) für display block/none
    kachel.style.display = kachelText.includes(eingabeSearchInput) ? 'block' : 'none';
  });
});


// ==========================================
// 4. APP STARTEN
// ==========================================
// Legt beim ersten Laden das Dashboard als Basis auf den Stapel
navigateTo(renderDashboard);