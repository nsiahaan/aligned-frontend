<script>
    import Card from './Card.svelte';
    import Cardback from './Cardback.svelte';
    import App from './routes/App.svelte';
    import { youser, profilePic } from './store.js';
    import { astroPicPath, mbtiPicPath } from './constants.js';

    let cardBackShowing = false;
    let selected;
    let list =[];
    let dictpics = {};
    let pics =[];
    let link = "/Profile/"

    
    function getPics(uids=[]) {
        let params = "?uid="
        if (typeof uids == "string" || typeof uids == "number") {
            params += uids
        } else {
            params += uids.join("&uid=")
        }
        let url = "http://127.0.0.1:5005/getPic" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {
            dictpics = d;
            return dictpics;
        })
        .then(d=>console.log(d))
    }
    function getListUIDs(uids) {
        let params = "?uid=" + uids.join("&uid=")
        let url = "http://127.0.0.1:5005/list" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {

            list = Object.values(d);

            return list;
        })
    }


    import {onMount} from 'svelte'
    onMount(()=> {
        console.log($youser.matches);
        getPics($youser.matches);
        getListUIDs($youser.matches);
    })

    
</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<center>
    <div class="container-fluid">
        <div class="cards-scroll">
            {#each list as person}
            <div class="card-butt">
                <!--<div class="flip-box">-->
                    <div class="card"> <!--class:show-back={selected===i} data-card-id={i}>-->
                        <Card 
                            AstroPic={$astroPicPath + person.astro + '.png'}
                            Picture={dictpics[person.uid]}
                            PersonalityPic = {$mbtiPicPath + person.mbti + '.png'}

                            Name = {person.name}
                            Astro = {person.astro}
                            Personality = {person.mbti}
                            Age = {person.age}
                            Gender = {person.gender}
                            Bio = {person.bio}
                        >
                        </Card>
                        <!--<Cardback/> -->
                    </div>
                <!--<footer on:click={toggleBackFront} data-card-id={i}>Hi</footer>-->
                <div>
                    <a class="btn btn-outline-dark" href={link + person.uid}> View Profile </a> 
                </div>
                <!--</div>-->
            </div>
            {/each}
        </div>    
    </div>  
</center>

<style>
    .btn {
    margin-bottom: 5px;
    }

    .cards-scroll {
        overflow-x: scroll;
        white-space: nowrap;
    }

    .card-butt {
        display:inline-block;
    }

    .card {
        display:inline-block;
        margin-top: 10px;
        margin-left: 40px;
        margin-right: 40px;
        margin-bottom: 15px;
        /*transition: transform 0.8s;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden; /* Safari */
}
</style>