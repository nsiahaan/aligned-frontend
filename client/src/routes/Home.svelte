<script>
import { dataset_dev } from "svelte/internal";
import BuyPack from "../Buy_pack.svelte";
import Nav from "../Nav.svelte";

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

<div class="container">
    <div class="card-holder">
        <h3 class = "option">
            <a class="btn btn-outline-dark" href="/Matches"> MATCHES </a></h3>
        <div class = card style = "width: 20rem;">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="profile-picture" {src}>
            <div class="card-body">
                <h5 class="profile-name">{name}</h5>
                <h6 class="profile-type">{star_sign}  |  {mbti}</h6>
                <p class="profile-bio">{bio}</p>
            </div>
        </div> 
    </div>

    <div class="card-holder">
        <h3 class = "option"> <a class="btn btn-outline-dark" href="/Crushes"> CRUSHES </a> </h3>
        <div class = "card" style = "width: 20rem;">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="profile-picture" {src}>
            <div class="card-body">
                <h5 class="profile-name">{name}</h5>
                <h6 class="profile-type">Capricorn |  ABCD</h6>
                <p class="profile-bio">{bio}</p>
            </div>
        </div>
    </div>

    <div class="card-holder">
        <h3 class = "option"> <a class="btn btn-outline-dark" href="/Packs">OPEN PACKS</a></h3>
        <div class = "card" style = "width: 20rem;">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="profile-picture" {src}>
            <div class="card-body">
                <h5 class="profile-name">{name}</h5>
                <h6 class="profile-type">Taurus |  ABCD</h6>
                <p class="profile-bio">{bio}</p>
            </div>
        </div>
    </div>
</div>

<style>
    .card-holder {
        display: inline-block;
        margin: auto;
        padding: 50px;
    }
    .card-body {
        text-align: center;
    }
    .option {
        text-align: center;
    }
</style>
