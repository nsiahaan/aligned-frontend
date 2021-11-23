<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<<<<<<< HEAD
<form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
=======

<script>
	import { youser,isAuthenticated, profilePic } from '../store.js'

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
				// youser.set(data);
				isAuthenticated.set(true)
				getUser(data['email'])
				return data;
			}
		}).then(d=>console.log(d))
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
>>>>>>> 0d689b246e5eb9634725be73b2d58cc9b2aff23e
