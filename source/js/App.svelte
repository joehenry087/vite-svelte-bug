<script>
    import {bar} from './library/store.svelte.js';
    import AppNav from './AppNav.svelte'

    let {foo} = $props();

    console.log('app', foo);
    if (foo) {
        bar.current = foo;
    }
</script>

<AppNav/>