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

    $: People = [
        {
          picture: 'images/default_profile_pics/kanye-west.png',
          uid: '0333d185-c173-48f1-915d-34bb470c807f',
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
          uid: '0333d185-c173-48f1-915d-34bb470c807f',
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
          uid: '0333d185-c173-48f1-915d-34bb470c807f',
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
          uid: '015a2ec5-47b6-4921-bed1-2520e16ad75b',
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
          uid: '015a2ec5-47b6-4921-bed1-2520e16ad75b',
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
          uid: '015a2ec5-47b6-4921-bed1-2520e16ad75b',
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
          uid: '015a2ec5-47b6-4921-bed1-2520e16ad75b',
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