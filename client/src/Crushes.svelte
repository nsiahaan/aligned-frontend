
<script>
    import Card from './Card.svelte';
    import Cardback from './Cardback.svelte';
    import { youser, profilePic } from './store.js';
    import { astroPicPath, mbtiPicPath } from './constants.js';
    import {onMount} from 'svelte'
    onMount(()=> {
        youser.useLocalStorage();
        console.log($youser.crushes);
        getPics($youser.crushes);
        getListUIDs($youser.crushes);
    })

    let cardBackShowing = false;
    let selected;
    $: list =[];
    let dictpics = {};
    let pics =[];

    // function removePerson() {
    //     People.pop();
    //     console.log("Remove");
    //     console.log(People);
    //     $: People = People;
    // }

    function sendLike(uid2) {
        let url = "http://127.0.0.1:5005/sendLike"
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid1: $youser.uid,
                uid2: uid2
            })
        }).then(() => {
            callUser()
        })
    }

    function callUser() {
        let url = "http://127.0.0.1:5005/list?uid=" + $youser.uid
        fetch(url)
        .then(d => d.json())
            .then(d => {
                youser.set(d);
                window.location.reload();
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
            list = [];
            return;
        }
        let params = "?uid=" + uids.join("&uid=")
        let url = "http://127.0.0.1:5005/list" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {
            if (uids.length == 1) {
                list = [d]
            }
            else {
                list = Object.values(d);
            }
        })
    }


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
                    <button class="btn btn-outline-dark" on:click={() => {sendLike(person.uid)}}> Match! </button>
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
    color: white;
    border-color: white;
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