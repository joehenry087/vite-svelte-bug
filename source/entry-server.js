import { render } from 'svelte/server';
import App from './js/App.svelte';

export function app(state) {
    return render(App, {
        props: {...state}
    });
}