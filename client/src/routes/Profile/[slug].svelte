<script>
    import { page } from '$app/stores';
    let id = $page.params.slug
    let list = []
    export let name = "Kanye";
    export let MBTI = "ENTP";
    export let starSign = "Taurus";
    export let age = "88";
    export let dob = "04/06/78"
    export let profileDescription = "This is my cute profile description.";
    export let gender = "Male";
    let src = {};

    function getInfoAndPic(uid) {
    let params = "?uid=" + uid
    let url = "http://127.0.0.1:5006/list" + params
    fetch(url)
    .then(d => d.json())
    .then(d => {
        list = d;
        name = list.name;
        starSign = list.astro;
        dob = list.dob;
        MBTI = list.mbti;

        return list;
    })

    
    url = "http://127.0.0.1:5006/getPic" + params
    fetch(url)
    .then(d => d.json())
    .then(d => {
        src = d;
        return src;
    })


    }


</script>


<svelte:window on:load={getInfoAndPic(id)}/>


<!--- 
    015a2ec5-47b6-4921-bed1-2520e16ad75b
  --->



<section>
    <div class="big-box">
        <div class="container">
            <div class="row">
                <div class="col">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <div class="center"> 
                        <img src={src[id]} class="resize" alt="Profile Picture is displayed here"/>
                    </div>
                </div>
                <div class="col-8">
                    <br>
                    <p> Name: {name} </p>
                    <p> MBTI: {MBTI} </p>
                    <p> Star Sign: {starSign} </p>
                    <p> Date of birth: {dob} </p>
                    <p> {profileDescription}
                    </p>
                    
                </div>
            </div>
        </div> 
    </div>
    
</section>




<style>

    p{
        font-size:larger;
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
        background-color: #c1b8ed;
        height: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        padding-bottom: 3em;
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









