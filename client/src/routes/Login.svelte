<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>


<script>
	import { youser,isAuthenticated, profilePic } from '../store.js'
	export let page_tracker = "Home"
	import {page} from '$app/stores';
	import {onMount} from 'svelte';
	onMount(() => {
		youser.useLocalStorage();
		isAuthenticated.useLocalStorage();
		profilePic.useLocalStorage();	
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
		        let url = "http://127.0.0.1:5005/getPic" + params
		        fetch(url)
		        .then(d => d.json())
		        .then(d => {
		        	console.log(d[uid])
		            profilePic.set(d[uid])
		            return d[uid]
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
				isAuthenticated.set(true)
				getUser(data['email'])
				window.location.replace('/Home')
			}
		}).then(d=>console.log(d))
	}
</script>

<div class="background">
    <div class="holder">
        <div class="column" id="login">
            <h1>Log In</h1>
            <div class="login-info">
                <h5 class="emaillabel">Email</h5>
				<input type="text" id="email" bind:value={email}><br><br>
				<h5 class="passwordlabel">Password</h5>
				<input type="password" id="password" bind:value={password}><br><br>
            </div>
            {#if invalidCreds}
			<p class="msg">Invalid email or password</p>
            {/if}
            <button class="btn btn-outline-dark" id="sign-in" on:click={submitCreds}>Sign In</button>
        </div>
        <div class="column">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="https://i.imgur.com/JuMCZCA.png" alt="login image" width="540" height="420"/>
        </div>
    </div>
</div>

<style>
    .holder {
        background-color: aliceblue;
        width: 65%;
        display: table;
        margin-top: 10%;
        margin-left: 10%;
        position: absolute;
        left: 6%;
        box-shadow: 50px 10px 5px #18184b;
    }
    #login {
        padding-left: 7%;
        display: inline-block;
    }
    .login-info {
        margin-top: 8%;
        left: 20%;
    }
    .background {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        /* background-color: #6c62c6; */
        background-image: linear-gradient(135deg, #7777f1, #26265f) /* #36348b) */
    }
    img {
        display: block;
    }
    .column {
        display: block;
        float: left;
        padding-right: 0;
        width: 50%;
    }
    button {
        margin-top: 5%;
        background-color: #39398e; /* #6c62c6; */
        color: white;
        position: relative;
    }
    h1 {
        position: relative;
        left: -7%;
        margin-top: 12%;
        text-align: center;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 200%;
        font-weight: bold;
    }
    h5 {
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-size: 120%;
        font-weight: 500;
    }
    input {
        border: 0;
        outline: 0;
        background: transparent;
        border-bottom: 3px solid #39398e;
        width: 80%;
    }
</style>