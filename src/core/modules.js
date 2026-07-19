import { entry as coffeeEntry } from '../modules/coffee/index.js';

export const modules = [
    {
    id: 'coffee',
    title: 'Coffee Calculator',
    icon: 'coffee.svg',
    order: 0,
    enabled: true,
    entry: coffeeEntry
    }
];