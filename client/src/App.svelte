<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
	import Packs from './Packs.svelte';
	import Nav from './Nav.svelte';
	import Home from './Home.svelte';
	import MyProfile from './MyProfile.svelte'
	import OpennedPackPage from './OpennedPackPage.svelte';
	export let name;
	let rand = -1;
	let list;

	function getRand() {
		fetch("http://127.0.0.1:5005/rand")
		.then(d => d.text())
		.then(d => (rand = d));
  }

  function getList() {
		fetch("http://127.0.0.1:5005/list")
		.then(d => d.text())
		.then(d => (list = d));
  }
</script>


<section> 
	<Nav/>
	<Home/>
</section>

<h1>Your number is {list}!</h1>
<button on:click={getList}>Get a random number</button>


<section>
	<OpennedPackPage/>
</section>

<section>
	<MyProfile/>
</section>

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