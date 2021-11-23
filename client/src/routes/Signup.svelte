<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>

    let name;
    let dob;
    let gender;
    let mbti;
    let sexPref = [];
    let phone;
    let bio;
    let instagram;
    let snapchat;
    let email;
    let password;
    let picture;
    let result = null;

    async function doPost () {
		const res = await fetch('http://127.0.0.1:5005/signup', {
			method: 'POST',
			body: JSON.stringify({
				name,
                dob, 
                gender,
                mbti,
                sexPref,
                phone,
                bio,
                instagram,
                snapchat,
                email,
                password,
                picture
			})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
	}

</script>

<form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="nameInput" placeholder="Enter name" bind:value={name} required> 
    </div>
    <br>
    <div class="form-group">
        <label for="birthday">Date of Birth</label>
        <br>
        <input type="date" id="birthday" name="dateofbirth" bind:value={dob}>
    </div>
    <br> 
    <div class="form-group">
        <label for="gender">Gender</label>
        <select class="form-control" id="genderInput" bind:value={gender} required>
          <option></option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
        </select>
    </div>
    <br>
    <div class="form-group">
        <label for="MBTI">MBTI</label>
        <select class="form-control" id="mbtiInput" bind:value={mbti} required>
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
          <option></option>
        </select>
        <small>If you don't know your MBTI?, takes this quick quiz!</small><br><br>
    </div>
    <div class="form-group">
        <label for="sexual-preference" id="sexual-prefInput">Sexual Preference</label> 
        <br>
        <div class="form-check form-check-inline" required>
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
    <!--
    <div class="form-group">
        <label for="phone">Phone Number</label><br>
        <input type="tel" id="phone" placeholder="123-457-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required bind:value={phone}><br>
        <small>Format: 123-456-7890</small><br><br>
    </div> -->
    <div class="form-group">
        <label for="bio">Write your Bio!!</label>
        <textarea class="form-control" id="inputBio" rows="3" placeholder="Tell me about yourself!" required bind:value={bio}></textarea>
    </div>
    <br>
    <div class="form-group">
        <label for="exampleFormControlFile1">Find a Profile Picture!</label> <br>
        <input type="file" class="form-control-file" id="inputPicture" accept="image/png, image/gif, image/jpeg" bind:value={picture} required>
    </div>
    <br>
    <div class="form-row">
        <div class="form-group col-md-5">
          <label for="insta">Instagram</label>
          <input type="text" class="form-control" id="inputInsta" bind:value={instagram}>
        </div> <br>
        <div class="form-group col-md-5">
          <label for="snap">Snapchat</label>
          <input type="text" class="form-control" id="inputSnap" bind:value={snapchat}>
        </div>
    </div>
    <br>
    <div class="form-row">
        <div class="form-group col-md-5">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" bind:value={email}>
        </div>
        <br>
        <div class="form-group col-md-5">
          <label for="inputPassword4">Password</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="Password" bind:value={password}>
        </div>
        <br>
    </div>
    <button type="button" on:click={doPost}>Submit</button>
</form>
    <br>
    <br>
    <br>
    <br>
    <br>

<pre> {result} </pre>


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

</style>