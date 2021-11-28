<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>


<script> 
    import {astroPicPath, mbtiPicPath} from '../constants.js';
    import {youser, profilePic, horodict} from '../store.js';
//     import {onMount} from 'svelte';
//     let pic
//     onMount(async () => {
//         let uid = $youser.uid
//         let params = "?uid=" + uid
// 
//         let url = "http://127.0.0.1:5005/getPic" + params
//         fetch(url)
//         .then(d => d.json())
//         .then(d => {
//             pic = d[uid]
//             console.log(d[uid])
//             return d[uid]
//         })
//     })

    
    let src = "images/default_profile_pics/kanye-west.png";
    import Card from '../Card.svelte';
    export let horoscope = "This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject. This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject.This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject.This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject.This is where my horoscope will be. Today, a surprise will befall you. \n Try and accept it, rather than reject.";
    export let name = "Kanye";
    export let MBTI = "ENTP";
    export let starSign = "Taurus";
    export let age = "88";
    let taurusLink = 'images/signs/taurus.png';

    export let profileDescription = "This is my cute profile description.";
    export let gender = "Male";
    

</script>

<section>
<div>
    <div class="card">
        {#if $youser.uid}
        <Card 
        AstroPic={$astroPicPath + $youser.astro + '.png'}
        Picture={$profilePic}
        PersonalityPic = {$mbtiPicPath + $youser.mbti + '.png'}
        Name = {$youser.name}
        Astro = {$youser.astro}
        Personality = {$youser.mbti}
        Age = {$youser.dob}
        Gender = {$youser.gender}
        Bio = {$youser.bio}
        />
        {/if} 
    </div>
    <div class="big-box">
        <div class="container">           
            <div class="row horoscope-wrapper">
                <br>
                <p> Daily Horoscope </p>
            </div>
            <div class="row horoscope-text horoscope">
                <p>{$horodict.description}</p>
            </div>
            <div class="row horoscope horoscope-bottom">
                <div class="col">
                Daily Love Compatibility:
                    <div>
                        {$horodict.compatibility}
                    </div>
                </div>
                <div class="col">
                Mood of the Day:
                    <div>
                        {$horodict.mood}
                    </div>
                </div>
                <div class="col">
                Lucky Number:
                    <div>
                        {$horodict.lucky_number}
                    </div>
                </div>
                <div class="col">
                Lucky Color:
                    <div>
                        {$horodict.color}
                    </div>
                </div>
            </div>
        </div> 
    </div>
</div>
    
</section>




<style>

    .card{
        float: left;
        height: auto;
        display:inline-block;
        margin-top: 10vh;
        margin-left: 40px;
        margin-right: 20px;
        margin-bottom: 15px;
    }
    p{
        font-size: larger;

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
    .big-box{
        width: 50%;
        margin-right: 10%;
        background-color: #c1b8ed;
        height: auto;
        margin-top: 10%;
        margin-bottom: 50px;
        padding-bottom: 3em;
        float: right;
        outline-style: solid;
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