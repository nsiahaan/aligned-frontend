<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>


<script> 
    import {astroPicPath, mbtiPicPath} from '../constants.js';
    import { youser,isAuthenticated, profilePic } from '../store.js'
    import {onMount} from 'svelte';
    let pic;
    onMount(() => {
        pic = $profilePic;
        console.log(pic);
    })
    
    
    let src = "https://firebasestorage.googleapis.com/v0/b/aligned-5a855.appspot.com/o/KmQOWT6ShjdiAXKAgcQYyM3rpCo1?alt=media";
    export let horoscope = "This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject.";
    export let name = "Kanye";
    export let MBTI = "ENTP";
    export let starSign = "Taurus";
    export let age = "88";
    export let dob = "04/06/78"
    export let profileDescription = "This is my cute profile description.";
    export let gender = "Male";
    
    async function logout () {
        isAuthenticated.set(false)
	}
</script>

<section>
    <div class="big-box">
        <div class="container">
            <div class="row">
                <div class="col">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <div class="center"> 

                        <img {pic} class="resize" alt="Profile Picture is displayed here"/>

                        }
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
                    <p> Name: {$youser.name} </p>
                    <p> MBTI: {$youser.mbti} </p>
                    <p> Star Sign: {$youser.astro} </p>
                    <p> Date of birth: {$youser.dob} </p>
                    <p> {$youser.bio}
                    </p>
                    
                </div>
            </div>
        </div> 
    </div>
    
</section>




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
        height: 300px;
        width: 300px;
        overflow: hidden;
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
        margin-left: -75px;
        width: auto;
        /*margin: auto;*/
    }
    .big-box{
        background-color: #c1b8ed;
        height: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        padding-bottom: 3em;
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