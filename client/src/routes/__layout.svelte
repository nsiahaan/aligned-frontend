<script>
    import Nav from '$lib/header/Nav.svelte'
    import Login from './Login.svelte'
    import Signup from './Signup.svelte'
    import Landing from './Landing.svelte'
    import {page} from '$app/stores';
    import { youser, isAuthenticated, profilePic, horodict } from '../store.js'
    export let page_tracker = $page.path.replace(/[^\w\s]/gi, '');


    import {onMount} from 'svelte';
    onMount(() => {
        youser.useLocalStorage();
        isAuthenticated.useLocalStorage();
        profilePic.useLocalStorage();
        horodict.useLocalStorage();  
    })
</script>

<div class='centered'> 
{#if $isAuthenticated}
<Nav bind:page_tracker={page_tracker} />
{/if}
</div>


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

<style>
.centered {
    margin: auto;
    width: 80%;
    padding: 10px;
}

</style>