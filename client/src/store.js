import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
	const { subscribe, set } = writable(startValue);

	return {
		subscribe,
		set,
		useLocalStorage: () => {
			const json = window.localStorage.getItem(key);
			if (json) {
				set(JSON.parse(json));
			}

			subscribe(current => {
				window.localStorage.setItem(key, JSON.stringify(current));
			});
		}
	};
}

export const isAuthenticated = createWritableStore('isAuthenticated',false);
export const youser = createWritableStore('youser',{});
export const horodict = createWritableStore('horodict',{});
export const profilePic = createWritableStore('profilePic',"images/default_profile_pics/no-user.png");
