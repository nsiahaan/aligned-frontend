<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>


<script> 
    import {astroPicPath, mbtiPicPath} from '../constants.js';
    import { youser, isAuthenticated, profilePic, horodict } from '../store.js'
    import {onMount} from 'svelte';

    $: src = {};

    onMount(() => {

        // src = getPic();

    })
    
    function getPic() {
        let params = "?uid=" + $youser.uid
        let url = "http://127.0.0.1:5005/getPic" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {
            src = d[$youser.uid];
            console.log(src[$youser.uid])
            return src[$youser.uid];
        })
    }
    
    // let src = "https://firebasestorage.googleapis.com/v0/b/aligned-5a855.appspot.com/o/KmQOWT6ShjdiAXKAgcQYyM3rpCo1?alt=media";
    
    /* now-unused, commenting out temporarily to avoid warning messages...
    export let horoscope = "This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject.";
    export let name = "Kanye";
    export let MBTI = "ENTP";
    export let starSign = "Taurus";
    export let age = "88";
    export let dob = "04/06/78"
    export let profileDescription = "This is my cute profile description.";
    export let gender = "Male";
    export let instagram;
    export let snapchat;
    */
    
    function logout () {
        youser.set({})
        profilePic.set("images/default_profile_pics/no-user.png")
        horodict.set({})
        isAuthenticated.set(false)
	}
</script>

<svelte:window on:load={getPic()}/>

<div class="bgd">
<section>
    <div class="big-box">
        <div class="container">
            <div class="row">
                <div class="col">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <div class="center">  
                        <img src={src} class="resize" alt="Profile Picture is displayed here"/>
                        <!--src={src} "images/card-dark.png"-->
                        
                    </div>
                </div>
                <div class="col-8">
                    <br>
                    <div class="dropdown d-flex align-items-end justify-content-end">
                        <button class="btn btn-secondary rounded" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="http://localhost:3000/EditAccount">Edit Profile</a></li>
                        <li><a class="dropdown-item" href="https://www.16personalities.com/free-personality-test">Take Personality Test</a></li>
                        <li><button type="button" class="dropdown-item" on:click={logout} >Logout</button></li>
                        </ul>
                    </div>
                    <p> <b>Name: </b>{$youser.name} </p>
                    <p> <b>MBTI: </b>{$youser.mbti} </p>
                    <p> <b>Star Sign: </b>{$youser.astro} </p>
                    <p> <b>Date of Birth: </b>{$youser.dob} </p>
                    <p> <b>Instagram: </b>{$youser.instagram} </p>
                    <p> <b>Snapchat: </b>{$youser.snapchat} </p>
                    <p> <b>About Me: </b>{$youser.bio} </p>

                    <!-- uncomment this to remove bolded labels..
                    <p> Name: {$youser.name} </p>
                    <p> MBTI: {$youser.mbti} </p>
                    <p> Star Sign: {$youser.astro} </p>
                    <p> Date of birth: {$youser.dob} </p>
                    <p> Instagram: {$youser.instagram} </p>
                    <p> Snapchat: {$youser.snapchat} </p>
                    <p> {$youser.bio} </p>
                    -->
                    
                </div>
            </div>
        </div> 
        <br>
    </div>
    <br><br>
</section>
</div>

<style>
    .col-8 {
        padding-right: 2%;
    }
    p{
        font-size: larger;
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
    .rounded{
        border-radius: 100% !important;
        background-color: white;
        color: black;
    }
    .center{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        /*height: 300px; overflow: hidden; DOUBLE CHECK TO MAKE SURE THIS DOESN'T BREAK ANYTHING! */
        width: 300px;
        margin: auto;
        padding-top: 15%
        /*margin-top: 50px;
        margin-bottom: 50px;*/
    }
    /*
    .horoscope-text{
        padding-bottom: 3em;
        padding-top: 1em;
        text-align: center !important;
    }

    .horoscope-bottom{
        padding-bottom: 1em;
    }
    */
    .resize { /* note: this is the profile picture.. ? */
        height: 300px;
        /*margin-left: -75px;*/
        width: 300px;
        overflow: hidden;
        display: block;
        /*margin: auto;*/
        box-shadow: 0px 0px 15px #18184b; /* delete this line to remove profile picture shadow */
    }
    .big-box{
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
    /*
    .row-box{
        background-color: #c1b8ed;
        /* outline-style: solid; 
    }
    .horoscope {
        background-color: white !important;
    }

    .horoscope-wrapper{
        text-align: center;
    } */
    .col{
        text-align: center;
        /* outline-style: solid; */
    }
    .bgd {
        position: relative;
        height: auto;
        width: 100%;
        
        background-color: white;
        background-image: linear-gradient(180deg, white, #26265f);
        background-repeat: no-repeat;
        background-size: 100% auto; /**100% auto*/
        display: block;
    }
</style>