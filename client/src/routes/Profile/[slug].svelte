<script>
    import { page } from '$app/stores';
    let id = $page.params.slug
    let list = []
    export let name = "Kanye";
    export let MBTI = "ENTP";
    export let starSign = "Taurus";
    export let age = "88";
    export let dob = "04/06/78"
    export let profileDescription = "This is my cute profile description.";
    export let gender = "Male";
    export let instagram;
    export let snapchat;
    let phoneNumber = '';
    let email = ''
    let src = {};

    function getInfoAndPic(uid) {
    let params = "?uid=" + uid
    let url = "http://127.0.0.1:5005/list" + params
    fetch(url)
    .then(d => d.json())
    .then(d => {
        list = d;
        name = list.name;
        starSign = list.astro;
        dob = list.dob;
        MBTI = list.mbti;
        profileDescription = list.bio;
        email = list.email;
        phoneNumber = list.phoneNum;
        age = list.age;
        instagram = list.instagram;
        snapchat = list.instagram;

        return list;
    })

    
    url = "http://127.0.0.1:5005/getPic" + params
    fetch(url)
    .then(d => d.json())
    .then(d => {
        src = d;
        return src;
    })
    }


</script>

<svelte:window on:load={getInfoAndPic(id)}/>

<!--- 
    {JSON.stringify(list)}
    015a2ec5-47b6-4921-bed1-2520e16ad75b
  --->


<div class="bgd">
<section>
    <br>
    <div class="big-box">
        <div class="container">
            <div class="row">
                <div class="col">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <div class="center"> 
                        <img src={src[id]} class="resize" alt="Profile Picture is displayed here"/>
                    </div>
                </div>
                <div class="col-8">
                    <br>
                    <p> Name: {name} </p>
                    <p> MBTI: {MBTI} </p>
                    <p> Star Sign: {starSign} </p>
                    <p> Age: {age} </p>
                    <p> Date of birth: {dob} </p>
                    <p> Phone Number: {phoneNumber} </p>
                    <p> Email: {email} </p>
                    <p> Instagram: {instagram} </p>
                    <p> Snapchat: {snapchat} </p>
                    <br>
                    <p> {profileDescription}
                    </p>
                    
                </div>
            </div>
        </div> 
    </div>
    <div style="text-align:center;">
    <button type="button" class="btn btn-outline-dark" 
        on:click={() => {window.location.replace('/Home')}}>Back</button>
    </div>
    <br><br><br><br><br><br><br>
</section>
</div>



<style>

    p{
        font-size:larger;
    }
    .rounded{
        border-radius: 100% !important;
        background-color: white;
        color: black;
    }
    .center{
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .horoscope-text{
        padding-bottom: 3em;
        padding-top: 1em;
        text-align: center !important;
    }

    .horoscope-bottom{
        padding-bottom: 1em;
    }

    .resize {
        height: 300px;
        width: auto;
        margin: auto;
    }
    .big-box {
        /* background-color: white;  #c1b8ed; */
        background-color: aliceblue; /* white; */
        height: 70%;
        width: 80%;
        margin: auto;
        /* margin-top: 50px;
        margin-bottom: 50px; */
        padding-bottom: 3em;
        box-shadow: 8px 10px 5px #18184b;
    }
 
    .bgd {
        position: relative;
        height: auto;
        width: 100%;
       
        background-color: white;
        /* background-image: linear-gradient(180deg, white, #26265f); */
        background-image: url("https://i.imgur.com/NF8JmBa.png"); /* constellations, use line above for gradient */
        background-repeat: no-repeat;
        background-size: 100% auto; /**100% auto*/
        display: block;
    }

    .row-box{
        background-color: #c1b8ed;
        /* outline-style: solid; */
    }

    .horoscope {
        background-color: white !important;
    }

    .horoscope-wrapper{
        text-align: center;
    }
    .col{
        text-align: center;
        /* outline-style: solid; */
    }
</style>









