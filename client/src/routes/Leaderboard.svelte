<script>
    import Card from '../Card.svelte';
    import App from '../routes/App.svelte';

    import { astroPicPath, mbtiPicPath } from '../constants.js';
    import { youser, isAuthenticated, profilePic, horodict } from '../store.js'

    let cardBackShowing = false;
    let selected;
    let list =[];
    let leaders = [];
    let dictpics = {};
    let link = "/Profile/"

    function getLeaders() {
        let url = "http://127.0.0.1:5005/list"
        fetch(url)
        .then(d => d.json())
        .then(d => {
            return Object.values(d);
        })
        .then(list => {
            let females = []
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].gender == "female") {
                    females.push(list[i])
                }
            }
            return females
        })
        .then(females => {
            females.sort();
            list = females.slice(0, 50);
            let uids = list.map(a => a.uid);
            return uids
        })
        .then(uids => {
            getPics(uids)
        })
    }
    
    function getPics(uids=[]) {
        if (uids.length == 0) {
            return;
        }
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
        if (uids.length == 0) {
            return;
        }
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
        getLeaders()
    })

    
</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>
<div style="padding-top: 20px;margin-left: 15px; text-align: center">
    <h1 style="font-size: 70px;">Top 50 Leaderboard</h1>

</div>
<center>
    <div class="container-fluid">
        <div class="cards-scroll">
            {#each list as person, i}
            <div class="card-butt">
                <h3>{i+1}</h3>
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
        margin-bottom: 25px;
    }

    .cards-scroll {
        overflow-x: scroll;
        white-space: nowrap;
    }

    .card-butt {
        display:inline-block;
        padding-top: 65px;
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