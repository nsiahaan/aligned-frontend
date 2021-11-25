<script>
    import Nav from '$lib/header/Nav.svelte'
    import Login from './Login.svelte'
    import Signup from './Signup.svelte'
    import Landing from './Landing.svelte'
    import {page} from '$app/stores';
    import { youser, isAuthenticated, profilePic } from '../store.js'
    export let page_tracker = $page.path.replace(/[^\w\s]/gi, '');


    import {onMount} from 'svelte';
    onMount(() => {
        youser.useLocalStorage();
        isAuthenticated.useLocalStorage();
        profilePic.useLocalStorage();   
    })
</script>


{#if $isAuthenticated}
<Nav bind:page_tracker={page_tracker} />
{/if}



{#if !$isAuthenticated && page_tracker == "Login"}
    <Login bind:page_tracker={page_tracker}/>
{:else if !$isAuthenticated && page_tracker == "Signup"}
    <Signup bind:page_tracker={page_tracker}/>
{:else if !$isAuthenticated }
    <Landing bind:page_tracker={page_tracker}/>

{:else}
<main>
    <slot />
</main>
{/if}
