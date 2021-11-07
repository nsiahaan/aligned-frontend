<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
	import Card from './Card.svelte';
	import Packs from './Packs.svelte';
	import Nav from './Nav.svelte';
	import Home from './Home.svelte';
	import MyProfile from './MyProfile.svelte'
	import OpennedPackPage from './OpennedPackPage.svelte';
	export let name;
</script>


<section> 
	<Nav/>
</section>
<section>
	<OpennedPackPage/>
</section>

<section>
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