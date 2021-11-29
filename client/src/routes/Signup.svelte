<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
import { youser, isAuthenticated, profilePic, horodict } from '../store.js'
import {onMount} from 'svelte';
	onMount(() => {
		youser.useLocalStorage();
		isAuthenticated.useLocalStorage();
		profilePic.useLocalStorage();
        horodict.useLocalStorage();
	})

    export let page_tracker = "Home"
    let name;
    let dob;
    let gender = null;
    let mbti = null;
    let sexPref = [];
    let phoneNum;
    let bio;
    let instagram;
    let snapchat;
    let email;
    let password;
    let picture;
    let result = null;
    let passwordReminder;
    let phoneReminder;
    let sexReminder;

    function getUser(email) {
        console.log(email)
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

    function phonevalidation() {
        if (/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phoneNum)) {
            return true;
        }
        phoneReminder = true;
        return false;
    }
    function passvalidation() {
        if (password.length >= 6) {
            return true;
        }
        passwordReminder = true;
        return false;
    }

    function sexprevalidation() {
        if (sexPref.length > 0) {
            return true;
        }
        sexReminder = true;
        return false;
    }

    function doPost () {
        if (!phonevalidation()) {
            console.log(phoneNum);
            return;
        }
        if (!passvalidation()) {
            console.log(password);
            return;
        }
        if (!sexprevalidation()) {
            console.log(sexPref);
            return;
        }
		fetch('http://127.0.0.1:5005/signup', {
			method: 'POST',
			body: JSON.stringify({
				name,
                dob, 
                gender,
                mbti,
                sexPref,
                phoneNum,
                bio,
                instagram,
                snapchat,
                email,
                password,
                picture
			})
		}).then((response) => response.json())
        .then((json) => {
            JSON.stringify(json);
            isAuthenticated.set(true);
            getUser(email);
        })
	}

</script>

<form on:submit|preventDefault={doPost}>
    <div class="form-group col-md-6 col-centered"> 
      <label for="name">Name</label>
      <input type="text" class="form-control" id="nameInput" placeholder="Enter name" bind:value={name} required> 
    </div>
    <br>
    <div class="form-group col-md-6 col-centered">
        <label for="birthday">Date of Birth</label>
        <br>
        <input type="date" id="birthday" name="dateofbirth" bind:value={dob} required>
    </div>
    <br> 
    <div class="form-group col-md-6 col-centered">
        <label for="gender">Gender</label>
        <select class="form-control" id="genderInput" bind:value={gender} required>
          <option disabled selected value> -- select an option -- </option>         
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
        </select>
    </div>
    <br>
    <div class="form-group col-md-6 col-centered" >
        <label for="MBTI">MBTI</label>
        <select class="form-control" id="mbtiInput" bind:value={mbti} required>
          <option disabled selected value> -- select an option -- </option>
          <option>INFJ</option>
          <option>INFP</option>
          <option>INTJ</option>
          <option>INTP</option>
          <option>ISFJ</option>
          <option>ISTJ</option>
          <option>ISFP</option>
          <option>ISTP</option>
          <option>ENFJ</option>
          <option>ENFP</option>
          <option>ENTJ</option>
          <option>ENTP</option>
          <option>ESFJ</option>
          <option>ESTJ</option>
          <option>ESFP</option>
          <option>ESTP</option>
        </select>
        <small>If you don't know your MBTI?, takes this quick quiz! https://www.16personalities.com/free-personality-test</small><br><br>
    </div>
    <div class="form-group col-md-6 col-centered">
        <label for="sexual-preference" id="sexual-prefInput">Sexual Preference</label> 
        <br>
        <div class="form-check form-check-inline" required>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="male" bind:group={sexPref}>
            <label class="form-check-label" for="inlineCheckbox1">Male</label>
        </div>
        <div class="form-check form-check-inline" required>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="female" bind:group={sexPref}>
            <label class="form-check-label" for="inlineCheckbox2">Female</label>
        </div>
        <div class="form-check form-check-inline" required>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="non-binary" bind:group={sexPref}>
            <label class="form-check-label" for="inlineCheckbox3">Non-binary</label>
        </div>
        {#if sexReminder}
        <p class="error-message">You must check at least one preference</p>
        {/if}
    </div>
    <br>
    
    <div class="form-group col-md-6 col-centered">
        <label for="phone">Phone Number</label><br>
        <!--<input type="tel" id="phone" placeholder="123-457-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required bind:value={phone}><br>-->
        <input type="text" id="phone" placeholder="123-457-7890" required bind:value={phoneNum}><br>
        <small>Format: 123-456-7890</small>
        {#if phoneReminder}
        <p class="error-message">The format of the phone number is incorrect</p>
        {/if}
        <br><br>
    </div>
    <div class="form-group col-md-6 col-centered">
        <label for="bio">Write your Bio!!</label>
        <textarea class="form-control" id="inputBio" rows="3" placeholder="Tell me about yourself!" required bind:value={bio}></textarea>
    </div>
    <br>
    <div class="form-group col-md-6 col-centered">
        <label for="exampleFormControlFile1">Find a Profile Picture!</label> <br>
        <input type="file" class="form-control-file" id="inputPicture" accept="image/png, image/gif, image/jpeg" bind:value={picture} required>
    </div>
    <br>
    <div class="form-row">
        <div class="form-group col-md-6 col-centered">
          <label for="insta">Instagram</label>
          <input type="text" class="form-control" id="inputInsta" bind:value={instagram}>
        </div> <br>
        <div class="form-group col-md-6 col-centered">
          <label for="snap">Snapchat</label>
          <input type="text" class="form-control" id="inputSnap" bind:value={snapchat}>
        </div>
    </div>
    <br>
    <div class="form-row">
        <div class="form-group col-md-6 col-centered">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" bind:value={email}>
        </div>
        <br>
        <div class="form-group col-md-6 col-centered">
          <label for="inputPassword4">Password</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="Password" bind:value={password}>
          {#if passwordReminder}
            <p class="error-message">Password has to be more than six characters long</p>
          {/if}
        </div>
        <br>
    </div>
    <div style="text-align:center;">
        <!--<button type="button" class="btn btn-outline-secondary" on:click={doPost} disabled>Submit</button>-->
        <button type="submit" class="btn btn-outline-secondary">Submit</button>
    </div>    
</form>
    <br>
    <br>
    <br>
    <br>
    <br>


<style>

.error-message {
    color: tomato;
    flex: 0 0 100%;
    margin: 0 2px;
    font-size: 0.8em;
  }
textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

.col-centered{
    margin: 0 auto;
    float: none;
}

</style>