Die Architektur in einem Satz

Ich würde DailyOS inzwischen so beschreiben:

DailyOS ist eine modulare Single-Page-Application, deren Kern (Dashboard, Router und Authentifizierung) vom eigentlichen Funktionsumfang getrennt ist. Jedes Modul ist eine eigenständige Mini-Anwendung, die über einen gemeinsamen Einstiegspunkt gestartet wird und unabhängig erweitert werden kann.

                                    DailyOS
                                       │
                     ┌─────────────────┴─────────────────┐
                     │                                   │
                Frontend                           Backend
               (GitHub Pages)                     (Supabase)
                     │                                   │
                     │                                   │
        ┌────────────┴────────────┐          ┌───────────┴───────────┐
        │                         │          │                       │
     Browser                 PostgreSQL   Auth                  Storage
        │                         │
        │                         │
        └─────────────── API (Supabase SDK) ───────────────┘


Gesamtarchitektur 1.0

DailyOS
│
├── core/
│   ├── app.js
│   ├── router.js
│   ├── modules.js
│   └── state.js
│
├── components/
│   ├── Header
│   ├── Footer
│   ├── Tile
│   ├── Dialog
│   └── Navigation
│
├── layouts/
│   ├── Dashboard
│   ├── Grid
│   ├── List
│   └── Calendar
│
├── modules/
│   ├── coffee/
│   ├── bread/
│   ├── calendar/
│   ├── worktime/
│   ├── sport/
│   └── household/
│
├── services/
│   ├── supabase.js
│   ├── auth.js
│   └── storage.js
│
├── assets/
│
└── styles/

Frontend:

src/
│
├── main.js
│
├── core/
│   ├── app.js
│   ├── router.js
│   ├── modules.js
│   └── navigation.js
│
├── components/
│   ├── dashboard.js
│   ├── header.js
│   ├── footer.js
│   ├── tile.js
│   └── dialog.js
│
├── modules/
│   ├── bread/
│   ├── coffee/
	│      │
│      ├── index.js   ← Einstiegspunkt (entry)
│      ├── view.js    ← UI
│      ├── state.js   ← Zustand
│      └── style.css	
│   ├── calendar/
│   ├── worktime/
│   ├── sport/
│   ├── household/
│   └── meat/
│
├── services/
│   ├── supabase.js
│   ├── auth.js
│   ├── storage.js
│   └── settings.js
│
├── styles/
│
└── assets/

Zusammenspiel:

                    main.js
                        │
                        ▼
                    initApp()
                        │
                        ▼
                     app.js
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
      Header        Dashboard       Footer
                        │
                        ▼
               router.open(module)
                        │
                        ▼
                 module.entry()
                        │
                        ▼
              gewünschtes Modul startet


Ein Modul:

modules/

coffee/

├── index.js
├── view.js
├── service.js
├── state.js
└── styles.css


index.js
Einstiegspunkt

Router

↓

entry()

↓

Coffee startet

view.js
UL

Buttons

Grid

Karten

Formulare


service.js

Kommunikation.

Heute:

localStorage

Später:

Supabase

state.js

Temporäre Daten.

Zum Beispiel:

aktuelle Bohne

aktuelle Methode

Filter

Nicht alles muss sofort entstehen, aber wir haben bereits einen Platz dafür.

Router:

Router

↓

entry()

↓

index.js

↓

view.js -> view.render()

Der Router kennt:

aktuelle Seite
Navigation
Verlauf

Er kennt keine Module.

Dashboard:

Dashboard

↓

modules.js lesen

↓

Kacheln erzeugen

↓

Klick

↓

router.open()

Das Dashboard kennt ebenfalls keine Module

Datenfluss:

Benutzer

↓

Dashboard

↓

Router

↓

Coffee

↓

Service

↓

Supabase

↓

PostgreSQL

Und zurück:

PostgreSQL

↓

Supabase

↓

Service

↓

Coffee

↓

Benutzer


DailyOS UI-Regel Nr. 1

Komponenten erzeugen DOM-Elemente und geben sie zurück.

Nicht HTML.

Nicht Strings.

Sondern fertige Elemente.



Jede Datei bekommt genau eine Verantwortung.

Zum Beispiel:

tile.js → Eine Kachel erzeugen.
dashboard.js → Kacheln anordnen.
router.js → Navigation.
modules.js → Verfügbare Module beschreiben.
coffee/index.js → Coffee starten.

| Datei                                       | Verantwortung               |
| ------------------------------------------- | --------------------------- |
| `main.js`                                   | Startet die App             |
| `app.js`                                    | Initialisiert DailyOS       |
| `router.js`                                 | Navigation                  |
| `modules.js` *(später evtl. `registry.js`)* | Kennt alle Module           |
| `dashboard.js`                              | Baut das Dashboard auf      |
| `tile.js`                                   | Erzeugt genau eine Kachel   |
| `coffee/index.js`                           | Startet das Coffee-Modul    |
| `coffee/view.js`                            | Zeigt die Coffee-Oberfläche |

Dann kommt die zweite Regel

Die gefällt mir fast noch besser.

DailyOS Architektur-Regel 2

Ein Objekt kennt nur seinen direkten Nachbarn.

Also:

Dashboard
      │
      ▼
Tile

Tile kennt nicht:

Router ❌
Coffee ❌
Bread ❌
Supabase ❌

Tile kennt nur:

Ich kann geklickt werden.


Daraus entsteht Regel Nummer 3

Ich würde sie ebenfalls dokumentieren.

Komponenten benutzen nur die Daten, die sie wirklich benötigen.

Das hat einen großen Vorteil.

Wenn wir später ergänzen:

permission: 'shared'

oder

favorite: true

muss tile.js überhaupt nicht geändert werden.

Reise einer Kachel:
modules.js

↓

Coffee

↓

createTile()

↓

<section>

↓

return

↓

dashboard.js

↓

appendChild()

↓

index.html

↓

Browser zeigt die Kachel

