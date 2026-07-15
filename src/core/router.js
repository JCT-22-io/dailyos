// let currentPage = null;
// let currentView = null;
let currentModule = null;
const history = [];

export function open(module) {
    console.log('Open Module: ${module}');
    currentModule = module;   
}

export function back() {
    console.log('Back');
};

export function home() {
    console.log('Home');
};

