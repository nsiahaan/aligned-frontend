
<script>
    import Card from './Card.svelte';
    import Cardback from './Cardback.svelte';
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

    let defaultTestUIDs = ['d5f36d98-84df-4b12-b739-075b4c1aad0b', 'd340a698-2e8a-4649-96ee-e3bf359e8ff4', 'e45ffc64-1b95-4784-a610-742a017a7138', 'b052485c-7f4a-49b4-8a63-98bdcc0d6cb5', 'a826ce6c-f443-43fe-a0b1-c90aff03468e', 'f94b9c5d-9ceb-462c-a015-acbb15281cd1', '4286ee06-9a54-474c-bd07-d1cd9f6f64ee']

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

    const People = [
        {
          picture: 'images/default_profile_pics/kanye-west.png',
          astropic: 'images/signs/gemini.png',
          personalitypic: 'images/mbti_pics/isfp.png',
          name: 'Kanye West',
          astro: 'Gemini',
          mbti: 'ISFP',
          age: 30,
          gender: 'Male',
          bio: 'Best there ever was. I made Taylor famous. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        },
        {
          picture: 'images/default_profile_pics/kim-kardashian.png',
          astropic: 'images/signs/pisces.png',
          personalitypic: 'images/mbti_pics/intj.png',
          name: 'Kim Kardashian',
          astro: 'Pisces',
          mbti: 'INTJ',
          age: 32,
          gender: "Female",
          bio: 'I love my children, especially Chicago. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          picture: 'images/default_profile_pics/doja-cat.png',
          astropic: 'images/signs/leo.png',
          personalitypic: 'images/mbti_pics/enfj.png',
          name: 'Doja Cat',
          astro: 'Leo',
          mbti: 'ENFP',
          age: 24,
          gender: 'Female',
          bio: 'Catch all my popular music on Tiktok. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        },
        {
          picture: 'images/default_profile_pics/awkwafina.png',
          astropic: 'images/signs/cancer.png',
          personalitypic: 'images/mbti_pics/esfp.png',
          name: 'Awkwafina',
          astro: 'Cancer',
          mbti: 'ESFP',
          age: 27,
          gender: 'Female',
          bio: 'Did you know that Awkwafina isn\'t my real name? \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          picture: 'images/default_profile_pics/chris-pine.png',
          astropic: 'images/signs/aries.png',
          personalitypic: 'images/mbti_pics/estp.png',
          name: 'Chris Pine',
          astro: 'Aries',
          mbti: 'ESTP',
          age: 36,
          gender: 'Male',
          bio: 'I\'m the hottest Chris. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          picture: 'images/default_profile_pics/danny-devito.png',
          astropic: 'images/signs/sagittarius.png',
          personalitypic: 'images/mbti_pics/esfj.png',
          name: 'Danny Devito',
          astro: 'Sagittarius',
          mbti: 'ESFJ',
          age: '88',
          gender: 'Male',
          bio: 'Can I offer you an egg in this trying time?, \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          picture: 'images/default_profile_pics/margot-robbie.png',
          astropic: 'images/signs/libra.png',
          personalitypic: 'images/mbti_pics/entp.png',
          name: 'Margot Robie',
          astro: 'Libra',
          mbti: 'ENTP',
          age: 33,
          gender: 'Female',
          bio: 'You probably know me Suicide Squad, \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure' +
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
            'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];
    
    //module.exports = getList;
</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>
    <button on:click={() => getList(defaultTestUIDs)} 
            on:click={() => getPics(defaultTestUIDs)}
        class="btn btn-outline-dark">Open New Pack</button>
    <center>
        <div class="container-fluid">
            <div class="cards-scroll">
                {#each list as person, i}
                <div class="card-butt">
                    <!--<div class="flip-box">-->
                        <div class="card"> <!--class:show-back={selected===i} data-card-id={i}>-->
                            <Card 
                                AstroPic={person.astropic}
                                Picture={dictpics[person.uid]}
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