export function createTile(module) {
    // Section erzeugen
    const tile = document.createElement('section');

    // Titel erzeugen
    const title = document.createElement('h3');
    title.textContent = module.title;
    tile.appendChild(title);

    tile.classList.add('tile');
    
    return tile;
}