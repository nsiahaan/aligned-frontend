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
    /* commenting to remove warning messages...
    export let name = "Kanye";
    export let MBTI = "ENTP";
    export let starSign = "Taurus";
    export let age = "88";
    let taurusLink = 'images/signs/taurus.png';

    export let profileDescription = "This is my cute profile description.";
    export let gender = "Male"; */
    

</script>

<div class="bgd">
    <section>
    <div class="inner">
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
                    <p> </p>
                    <p><b>✧ Daily Horoscope ✧</b></p>
                </div>
                <div class="row horoscope-text horoscope">
                    <p><i>{$horodict.description}</i></p>
                </div>
                <div class="row horoscope horoscope-bottom">
                    <div class="col">
                        <b>Daily Love Compatibility</b>
                        <div>
                            {$horodict.compatibility}
                        </div>
                    </div>
                    <div class="col">
                        <b>Mood of the Day</b>
                        <div>
                            {$horodict.mood}
                        </div>
                    </div>
                    <div class="col">
                        <b>Lucky Number</b>
                        <div>
                            {$horodict.lucky_number}
                        </div>
                    </div>
                    <div class="col">
                        <b>Lucky Color</b>
                        <div>
                            {$horodict.color}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>      
    </section>    
</div>

<style>
    .bgd {
        position: absolute;
        height: 100%;
        width: 100%;
        
        background-color: white;
        background-image: url("https://i.imgur.com/sKGxBkW.png"); /* replace this with line 117 for gradient*/
        background-repeat: no-repeat;
        background-size: 100% auto; /**100% auto*/
        display: block;
    }
    /*
        WHY WONT THIS WORK OMG
        background-image: linear-gradient(180deg, white, #26265f);
    */
    .card {
        display: flex;
        margin-top: 2px;
        justify-content: center;
        align-items: center;
        float: left;
        width: 25rem;
        height: auto;
        margin-left: 8%;
        box-shadow: 0px 0px 15px white; /* adjust the color as necessary */
        /*
        float: left;
        height: auto;
        display: block;
        margin-top: 10vh;
        margin-left: 40px;
        margin-right: 20px;
        margin-bottom: 15px;
        */
    }
    p{
        font-size: larger;

    }
    /* 
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
    */
    .horoscope-text{
        padding-bottom: 3em;
        padding-top: 1em;
        text-align: center !important;
    }

    .horoscope-bottom{
        padding-bottom: 1em;
    }
    /*
    .resize {
        height: 300px;
        width: auto;
        margin: auto;
    } */
    .big-box{ /* this holds the horoscope stuff! */
        width: 50%;
        margin-right: 10%;
        background-color: #39398e; /* #c1b8ed; outline-style*/
        height: 50% auto;
        margin-top: 10%;
        margin-bottom: 50px; /* padding-bottom: 3em; */
        
        float: right;
        border: 5px solid;
        border-color: #26265f;
        border-radius: 4px;
        letter-spacing: 1px;
        box-shadow: 0px 0px 20px white;
    }
    /*
    .row-box{
        background-color: #c1b8ed;
        /* outline-style: solid; 
    } */

    .horoscope {
        background-color: aliceblue !important;
    }
    .horoscope-wrapper{
        text-align: center;
        color: aliceblue;
    }
    .col{
        text-align: center;
        /* outline-style: solid; */
    }
</style>