import { hydrate } from 'svelte'
import App from './js/App.svelte'

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

hydrate(App, {
    target: document.body
    , props: preloadedState
})
