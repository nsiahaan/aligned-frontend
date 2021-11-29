
<script>
    import Card from '../Card.svelte';
    import Cardback from '../Cardback.svelte';
    import { youser } from '../store.js'
    import {onMount} from 'svelte';

    $: imready = false;
    onMount(() => {
        youser.useLocalStorage();
        openPack();
    })

    function openPack() {
        let url = "http://127.0.0.1:5005/openPack"
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: $youser.uid
            })
        }).then(response => {
            if (response.status != 200) { // user doesn't have any packs
                response.text()
                .then(text => {window.alert(text); window.location.replace('/Packs')})
            }
            else {
                response.json()
                .then(d => {
                    getList(d);
                    getPics(d);
                }).then(() => { imready = true; callUser(); })
            }
        })
    }

    function callUser() {
        let url = "http://127.0.0.1:5005/list?uid=" + $youser.uid
        fetch(url)
        .then(d => d.json())
            .then(d => {
                youser.set(d)
            })
    }

    function sendLike(uid2) {
        let url = "http://127.0.0.1:5005/sendLike"
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid1: $youser.uid,
                uid2: uid2
            })
        })
    }

    let astroPicPath = 'images/signs/';
    let mbtiPicPath = 'images/mbti_pics/';



    let cardBackShowing = false;
    let selected;
    let list =[];
    let dictpics = {};
    let pics =[];
    let defaultTestUIDs = ['17465e7f-35d0-4a4f-931a-b4185e507b04', '217e2e1b-e242-4081-8678-44277014f940', '5cd73c82-94ac-4163-95b1-1ae5be851ea9', '39018b26-8c19-4279-ba0a-271f10a7b8df', '2e30119b-fe18-4ad2-a91d-a7aa88b8a3e8', '3acbc757-6d94-44ec-aee5-d7f0278e992b', '3b5a34c7-d906-477d-b66c-88100495f43f']

    const toggleBackFront = (e) => {
		// if same card clicked twice to toggle front and back
		if (selected === Number(e.target.dataset.cardId)) {
			selected = null;
			cardBackShowing = !cardBackShowing;
		} else {
			cardBackShowing = !cardBackShowing;
			selected = Number(e.target.dataset.cardId)
		}
	}

    function getListUIDs(uids) {
        let params = "?uid=" + uids.join("&uid=")
        let url = "http://127.0.0.1:5005/list" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {

            list = Object.values(d);
            for (let person in list) {
                if (person['astro'] == 'gemini') {
                    console.log("HI");
                    person['astropic'] = geminiLink;
                }
                if (person['astro'] == 'virgo') {
                    person['astropic'] = virgoLink;
                } 
            }

            return list;
        })
    }
    function getListUID(uid) {
        let params = "?uid=" + uid
        let url = "http://127.0.0.1:5005/list" + params
        fetch(url)
        .then(d => d.json())
        .then(d => {
            list = [d]; 
            let person = list[0]
            if (person['astro'] == 'gemini') {
                console.log("HI");
                person['astropic'] = geminiLink;
            }
            if (person['astro'] == 'virgo') {
                person['astropic'] = virgoLink;
            } 
            
            return list;
        })
    }
    function getList(uids) {
        if (typeof uids == "string" || typeof uids == "number") {
            return getListUID(uids)
        } else if (uids.constructor === Array){
            return getListUIDs(uids)
        }
        let url = "http://127.0.0.1:5005/list"
		fetch(url)
        .then(d => d.json())
		.then(d => {
            list = d; 
            list = list.slice(0, 7);
            for (let person in list) {
                if (person['astro'] == 'gemini') {
                    console.log("HI");
                    person['astropic'] = geminiLink;
                }
                if (person['astro'] == 'virgo') {
                    person['astropic'] = virgoLink;
                } 
            }
            return list;
        })
    }

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


    import { tweened } from 'svelte/motion';
    let original = 0; // TYPE NUMBER OF SECONDS HERE
    let timer = tweened(original)
    setInterval(()=> {
        $timer++;
    }, 1000);
    let src = "../images/astro-card.webp";
    

    //module.exports = getList;
</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>
<body>

    
    <div class="cards-scroll" style="padding: 30px">
    {#if $timer >= 1 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 2.5 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 4 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 5.5 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 7 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 8.5 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 10 && !imready}
    <img {src} alt="Open a pack here!"/>
    {/if}
    </div>
    <!-- {#if $timer > 25/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 30/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 35/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if} -->


    <center>
        <div class="container-fluid">
            <div class="cards-scroll">
                {#if imready}
                {#each list as person, i}
                <div class="card-butt">
                    <!--<div class="flip-box">-->
                        <div class="card"> <!--class:show-back={selected===i} data-card-id={i}>-->
                            <Card 
                                AstroPic={astroPicPath + person.astro + '.png'}
                                Picture={dictpics[person.uid]}
                                PersonalityPic = {mbtiPicPath + person.mbti + '.png'}
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
                    <div><button type="button" class="btn btn-outline-dark"
                        on:click={() => {sendLike(person.uid)}}>Send Like!</button>
                    </div>
                </div>
                {/each}
                {/if}
            </div>
            <button type="button" class="btn btn-outline-dark" 
                on:click={() => {window.location.replace('/Packs')}}>Done</button>
        </div>
    </center>
</body>
<style>

.flip-box{
    perspective: 1000px;
}

.show-back {
		transform: rotateY(180deg);
	}

.btn {
    margin-bottom: 30px;
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