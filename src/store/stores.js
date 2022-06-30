import { writable } from 'svelte/store';

export const carModel = writable(null);
export const carColor = writable('#0d1116');
export const entryAnimationRunning = writable(true);
export const pauseAnimation = writable(false);
