<script>
import { dataset_dev } from "svelte/internal";
import BuyPack from "../Buy_pack.svelte";
import Nav from "../Nav.svelte";
import Matches from "../Matches.svelte"
import Crushes from "../Crushes.svelte"

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
    <div class="row">
        <h3 class = "option"> MATCHES</h3>
        <Matches/>
    </div>

    <div class="row">
        <h3 class = "option">  CRUSHES </h3>
        <Crushes/>
    </div>


</div>

<style>

    h3{
        font-size: xxx-large;
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
    .row{
        padding-bottom: 10em;
    }
    /*
    .card-holder {
        display: inline-block;
        margin: auto;
        padding: 50px;
    }
    .card-body {
        text-align: center;
    }
    */
    .option {
        text-align: center;
    }
</style>
