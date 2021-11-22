
<script>
    import Card from '../Card.svelte';
    import Cardback from '../Cardback.svelte';
    //import Info from './information.js';
    
    //async function loadComponent(name) {
	//		console.log(`./${name}.svelte`);
    //    return await import(`./${name}.svelte`);
    //}
    let aquariusLink = 'images/signs/aquarius.png';
    let ariesLink = 'images/signs/aries.png';
    let cancerLink = 'images/signs/cancer.png';
    let capricornLink = 'images/signs/capricorn.png';
    let geminiLink = 'images/signs/gemini.png';
    let leoLink = 'images/signs/leo.png';
    let libraLink = 'images/signs/libra.png';
    let piscesLink = 'images/signs/pisces.png';
    let sagittariusLink = 'images/signs/sagittarius.png';
    let scorpioLink = 'images/signs/scorpio.png';
    let taurusLink = 'images/signs/taurus.png';
    let virgoLink = 'images/signs/virgo.png';
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


    let showme = true;
    function dontShowMe() {
        showme = false;
    }

    import { tweened } from 'svelte/motion';
    let original = 0; // TYPE NUMBER OF SECONDS HERE
    let timer = tweened(original)
    setInterval(()=> {
        $timer++;
    }, 1000);
    let src = "images/astro-card.webp";
    

    //module.exports = getList;
</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>
<body>
    {#if $timer >= 5 && showme}
    <button 
            on:click={() => getList(defaultTestUIDs)} 
            on:click={() => getPics(defaultTestUIDs)}
            on:click={dontShowMe}
        class="btn btn-outline-dark"
        id="openPackButton" 
        >Reveal Cards!</button>
    {/if}

    {#if $timer > 5/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 10/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 15/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 20/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 25/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 30/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}
    {#if $timer > 35/7 && $timer < 35/7}
    <img {src} alt="Open a pack here!"/>
    {/if}


    <center>
        <div class="container-fluid">
            <div class="cards-scroll">
                {#each People as person, i}
                <div class="card-butt">
                    <!--<div class="flip-box">-->
                        <div class="card"> <!--class:show-back={selected===i} data-card-id={i}>-->
                            <Card 
                                AstroPic={person.astropic}
                                Picture={person.picture}
                                PersonalityPic = {person.personalitypic}
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
                    <div><button type="button" class="btn btn-outline-dark">Match!</button></div>
                    <!--</div>-->
                </div>
                {/each}
            </div>    
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