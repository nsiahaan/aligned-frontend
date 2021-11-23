<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
	import Cardback from '../Cardback.svelte';
	import Card from '../Card.svelte';
	import Packs from './Packs.svelte';
	import Nav from '../Nav.svelte';
	import Home from './Home.svelte';
	import MyProfile from './MyProfile.svelte'
	import OpenedPack from './OpennedPack.svelte';
	import Login from './Login.svelte';

	import { isAuthenticated } from '../store.js';
  	
	let rand = -1;
	let list;

	export let page_tracker = window.location.pathname.replace(/[^\w\s]/gi, '');

  	function getList() {
		fetch("http://127.0.0.1:5005/list")
		.then(d => console.log(d))
		//.then(d => d.text())
		//.then(d => (list = d));
  }

</script>

{#if page_tracker=="Home" && $isAuthenticated}
<section> 
	<Home/>
</section>
{:else if page_tracker=="Packs" && $isAuthenticated}
<section>
	<Packs bind:page_tracker={page_tracker}/>
</section>
{:else if page_tracker=="MyProfile" && $isAuthenticated}
<section>
	<MyProfile/>
</section>
{:else if page_tracker=="OpennedPack" && $isAuthenticated}
<section>
	<OpennedPack/>
</section>
{:else}
<section>
	<Login/>
</section>
{/if}

<!-- 
<h1>Your number is {list}!</h1>
<button on:click={getList}>Get a random number</button>
-->


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>