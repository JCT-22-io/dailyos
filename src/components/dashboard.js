import { modules } from '../core/modules.js';
import { createTile } from './tile.js';

// Für jedes aktivierte Modul wird eine Kachel erzeugt und dem Dashboard hinzugefügt.

export function renderDashboard(container) {
    container.innerHTML = '';
    modules.forEach((module) => {
        // Prüfen ob der User das Modul sehen darf
        if (!module.enabled) {
           return;
        }
        const tile = createTile(module);
        container.appendChild(tile);

    });
}