<script>
    import Nav from '$lib/header/Nav.svelte'
    import {page} from '$app/stores';
    export let page_tracker = $page.path.replace(/[^\w\s]/gi, '');
    
</script>

<Nav bind:page_tracker={page_tracker} />

<main>
    <slot />
</main>