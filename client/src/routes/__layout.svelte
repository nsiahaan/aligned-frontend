<script>
    import Nav from '$lib/header/Nav.svelte'
    export let page_tracker = "Home";
</script>

<Nav bind:page_tracker={page_tracker} />

<main>
    <slot />
</main>