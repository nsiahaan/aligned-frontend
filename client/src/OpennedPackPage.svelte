
<script>
    import Card from './Card.svelte';
    import Cardback from './Cardback.svelte';
    
    //async function loadComponent(name) {
	//		console.log(`./${name}.svelte`);
    //    return await import(`./${name}.svelte`);
    //}

    let cardBackShowing = false;
    let selected;

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

    function getList() {
		fetch("http://127.0.0.1:5005/list")
		.then(d => console.log(d))
		//.then(d => d.text())
		//.then(d => (list = d));
    }
    const People = [
        {
          picture: 'images/default_profile_pics/kanye-west.png',
          astropic: 'images/signs/gemini.png',
          personalitypic: 'images/mbti_pics/isfp.png',
          fullname: 'Kanye West',
          astro: 'Gemini',
          personality: 'ISFP',
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
          fullname: 'Kim Kardashian',
          astro: 'Pisces',
          personality: 'INTJ',
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
          fullname: 'Doja Cat',
          astro: 'Leo',
          personality: 'ENFP',
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
          fullname: 'Awkwafina',
          astro: 'Cancer',
          personality: 'ESFP',
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
          fullname: 'Chris Pine',
          astro: 'Aries',
          personality: 'ESTP',
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
          fullname: 'Danny Devito',
          astro: 'Sagittarius',
          personality: 'ESFJ',
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
          fullname: 'Margot Robie',
          astro: 'Libra',
          personality: 'ENTP',
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
    <div on:load={getList}></div>
    <center>
        <div class="container-fluid">
            <div class="cards-scroll">
                {#each People as person, i}
                <div class="card-butt">
                    <!--<div class="flip-box">-->
                        <div class="card"> <!--class:show-back={selected===i} data-card-id={i}>-->
                            <Card 
                                AstroPic={person.astropic}
                                Picture = {person.picture}
                                PersonalityPic = {person.personalitypic}
                                Name = {person.fullname}
                                Astro = {person.astro}
                                Personality = {person.personality}
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