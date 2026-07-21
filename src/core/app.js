import { renderDashboard } from '../components/dashboard.js';

export function initApp() {
    
    const appContainer = document.getElementById('app');

    renderDashboard(appContainer);

}