<script>
import App from "./App.svelte";
import BuyPack from "./Buy_pack.svelte";
import Nav from "./Nav.svelte";

let src = "images/corgi.jpg";
let name = "Random Random Corgi!";
let star_sign = "Sagittarius";
let mbti = "INFP";
let bio = "I like food, dogs, and naps! More words go here.. and here.. words, words, words, blah!";

</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<div>
    <div class="card-holder">
        <div class = "card" style = "width: 20rem;">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="profile-picture" {src}>
            <div class="card-body">
                <h5 class="profile-name">{name}</h5>
                <h6 class="profile-type">{star_sign}  |  {mbti}</h6>
                <p class="profile-bio">{bio}</p>
            </div>
        </div>
    </div>
</div>

<style>
    .card-holder {
        padding-top: 50px;
        padding-left: 100px;
    }
    .card-body {
        text-align: center;
    }
</style>
