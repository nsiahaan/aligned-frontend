<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>


<script>
	import { youser, isAuthenticated, profilePic, horodict } from '../store.js'
	export let page_tracker = "Home"
	import {page} from '$app/stores';
	import {onMount} from 'svelte';
	onMount(() => {
		youser.useLocalStorage();
		isAuthenticated.useLocalStorage();
		profilePic.useLocalStorage();
		horodict.useLocalStorage();	
	})
	
	let email = "";
	let password = "";
	let uid = "";
	let invalidCreds = false;

	function getUser(email) {
        let params = "?email=" + email
        let url = "http://127.0.0.1:5005/getuid" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {
            let params = "?uid=" + d
            let url = "http://127.0.0.1:5005/list" + params
            fetch(url)
	        .then(d => d.json())
	        .then(d => {
	            youser.set(d)
	            return d;
	        }).then(d => {
	        	let uid = d.uid
		        let params = "?uid=" + uid
				let url = "http://127.0.0.1:5005/horoscope" + params
				fetch(url)
				.then(d => d.json())
				.then(d => {
					horodict.set(d)
				}).then(() => {
					let url = "http://127.0.0.1:5005/getPic" + params
					fetch(url)
					.then(d => d.json())
					.then(d => {
						profilePic.set(d[uid])
					}).then(() => {
						window.location.replace('/Home')
					})
				})
        	})
		})
    }

	function submitCreds() {
		if (email == "" || password == "") {
			return
		}
		let url = "http://localhost:5005/login";
		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then((response) => {
			if (response.status != 200) {
				console.log(response.status);
				return;
			}
			return response.json();
		}).then((data) => {
			if (!data) {
				invalidCreds = true;
				return data;
			} else {
				invalidCreds = false;
				page_tracker = "Home";
				isAuthenticated.set(true);
				getUser(data['email']);
			}
		})
	}
</script>

<div class="outerouter">
	<div class="pinkbox">
		<div class="title">
				<h1>Login</h1>
		</div>
		<div class="purplebox">
			<div class="inner">
				<h5 class="emaillabel">Email:</h5>
				<input type="text" id="email" bind:value={email}><br><br>
				<h5 class="passwordlabel">Password:</h5>
				<input type="password" id="password" bind:value={password}><br><br>
			</div>
		</div>
		{#if invalidCreds}
			<p class="msg">Invalid email or password</p>
		{/if}
		<button class="button" on:click={submitCreds}>Sign In</button>
		
	</div>
</div>

<style>
	.msg {
		position: absolute;
		left: 50%;
		margin-top: -60px;
		margin-left: -90px;
		color: red;
	}
	.outerouter {
		height: 560px;
		margin-top: 50px;
		/*background-color: grey;*/
		padding-bottom: 50px;
		/*padding-top: 50px;*/
	}
	.pinkbox {
		width: 400px;
		position: absolute;
		background-color: #fcdef3;
		left:50%;
		margin-left: -200px;
		height: 510px;
		padding-top: 30px;
		border-radius: 30px;
	}
	.title {
		margin-left: 50px;
		margin-top: 20px;
	}
	.button {
		background-color: #ffa1d9;
		color: #404040;
		text-align: center;
		border-radius: 12px;
		width: 140px;
		display: inline-block;
		position: absolute;
		margin-top: -17px;
		left: 50%;
		margin-left: -70px;
	}
	.purplebox {
		margin-top: 40px;
		width: 300px;
		padding-top: 10px;
		text-align: center;
		background-color: #d7c9ff;
		left: 50%;
		margin-left: 50px;
		height: 330px;
		border-radius: 15px;
	}
	.emaillabel {
		margin-left: -182px;
	}
	.passwordlabel {
		margin-top: 20px;
		margin-left: -140px;
	}

	.inner {
		margin-top: 50px;
	}
</style>
