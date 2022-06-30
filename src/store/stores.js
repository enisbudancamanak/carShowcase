import { writable } from 'svelte/store';

export const carModel = writable(null);
export const carColor = writable('#202124');
export const entryAnimationRunning = writable(true);
