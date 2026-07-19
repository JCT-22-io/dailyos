// let currentPage = null;
// let currentView = null;
let currentModule = null;
const history = [];

export function open(module) {
    currentModule = module;
    console.log(`Open Module: ${module.title}`);
    module.entry();
}

export function back() {
    console.log('Back');
};

export function home() {
    console.log('Home');
};

