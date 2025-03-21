# vite-svelte-bug
Strang inexplicable bug

1. `npm run dev`
2. Visit `localhost`
3. Look at the server output, see that `foo` is printed `1` in all cases ('render', 'app', 'app nav').
4. Reload the page
5. See that `foo` is properly printed as `0` at 'render' and 'app' but not 'app nav', which is using the first render's data somehow.