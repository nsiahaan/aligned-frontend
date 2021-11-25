<script>
    import Nav from '$lib/header/Nav.svelte'
    import Login from './Login.svelte'
    import {page} from '$app/stores';
    import { youser, isAuthenticated } from '../store.js'
    export let page_tracker = $page.path.replace(/[^\w\s]/gi, '');
    
</script>

<Nav bind:page_tracker={page_tracker} />
{#if !$isAuthenticated}
<Login/>

{:else}
<main>
    <slot />
</main>
{/if}