import { writable } from 'svelte/store';


export const isAuthenticated = writable(true);
export const youser = writable({});
export const profilePic = writable("images/default_profile_pics/no-user.png");