<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
    import { youser, isAuthenticated, profilePic } from '../store.js'
    import {onMount} from 'svelte';
	onMount(() => {
		youser.useLocalStorage();
		isAuthenticated.useLocalStorage();
		profilePic.useLocalStorage();
	})
    let name = $youser.name;
    let gender = $youser.gender;
    let mbti = $youser.mbti;
    let sexPref = $youser.sPref;
    gender = gender.charAt(0).toUpperCase() + gender.slice(1);
    let phone = $youser.phoneNum;
    let bio = $youser.bio;
    let instagram = $youser.instagram;
    let snapchat = $youser.snapchat;
    let password = $youser.password;
    let picture = false;
    let result = null;
    let uid = $youser.uid;

    function addProfilePic(uid) {
        if (!picture) { return; }
        console.log("trying to add pic")
        let url="http://localhost:5005/addPic";
        
        var formData  = new FormData();
        formData.append('uid',uid);
        formData.append('file', picture[0]);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then((response) => response.json()).then((result) => {
            console.log('Success:', result);
        }).catch((error) => {
                console.error('Error:', error);
            });
    }
    function doPost () {

        if(sexPref.length == 0) {
            sexPref = $youser.sPref;
        }
        if(gender == "") {
            gender = $youser.gender;
            gender = gender.charAt(0).toUpperCase() + gender.slice(1);
            console.log(gender);
        }
        if(mbti == "") {
            mbti = $youser.mbti;
        }
        for (let i = 0; i < sexPref.length; i++) {
            sexPref[i] = sexPref[i].toLowerCase();
        }
        gender = gender.toLowerCase();
		fetch('http://127.0.0.1:5005/update', {
			method: 'POST',
			body: JSON.stringify({
                uid,
				name,
                gender,
                mbti,
                sexPref,
                phone,
                bio,
                instagram,
                snapchat,
                password,
                picture
			})
		}).then(() => {
            addProfilePic($youser.uid)
        })
        .then(() => {
            console.log("about to call callUsser()")
            callUser();
        })
	}

    function callUser() {
        console.log("callUser called")
        let url = "http://127.0.0.1:5005/list?uid=" + uid
        fetch(url)
        .then(d => d.json())
            .then(d => {
                youser.set(d)
                window.location.replace("/MyAccount")
            })
    }

</script>

<form>
    <div class="form-group col-md-6 col-centered"> 
      <label for="name">Name</label>
      <input type="text" class="form-control" id="nameInput" placeholder="Enter name" bind:value={name}> 
    </div>
    <br> 
    <div class="form-group col-md-6 col-centered">
        <label for="gender">Gender</label>
        <select class="form-control" id="genderInput" bind:value={gender}>
          <option></option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
        </select>
    </div>
    <br>
    <div class="form-group col-md-6 col-centered">
        <label for="MBTI">MBTI</label>
        <select class="form-control" id="mbtiInput" bind:value={mbti}>
          <option></option>
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
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="male" bind:group={sexPref}>
            <label class="form-check-label" for="inlineCheckbox1">Male</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="female" bind:group={sexPref}>
            <label class="form-check-label" for="inlineCheckbox2">Female</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="non-binary" bind:group={sexPref}>
            <label class="form-check-label" for="inlineCheckbox3">Non-binary</label>
        </div>
    </div>
    <br>
    
    <div class="form-group col-md-6 col-centered">
        <label for="phone">Phone Number</label><br>
        <input type="tel" id="phone" placeholder="123-457-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" bind:value={phone}><br>
        <small>Format: 123-456-7890</small><br><br>
    </div>
    <div class="form-group col-md-6 col-centered">
        <label for="bio">Write your Bio!!</label>
        <textarea class="form-control" id="inputBio" rows="3" placeholder="Tell me about yourself!" bind:value={bio}></textarea>
    </div>
    <br>
    <div class="form-group col-md-6 col-centered">
        <label for="exampleFormControlFile1">Find a Profile Picture!</label> <br>
        <input type="file" class="form-control-file" id="inputPicture" accept="image/png, image/gif, image/jpeg" bind:files={picture}>
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
          <label for="inputPassword4">Password</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="Password" bind:value={password}>
        </div>
        <br>
    </div>
    <div style="text-align:center;">
        <button type="button" class="btn btn-outline-secondary" on:click={doPost}>Submit</button>
    </div>    
</form>
    <br>
    <br>
    <br>
    <br>
    <br>

<style>
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