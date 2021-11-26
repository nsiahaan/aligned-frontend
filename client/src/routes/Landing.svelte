<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
    import {page} from '$app/stores';
    export let page_tracker = "Landing"
    // import Background from '../Background.svelte';
</script>


<div class="image">
<section>
    <div class="nav-area">
        <button type="button" class="btn btn-outline-light" id="login-button"
        on:click={()=> page_tracker = "Login"}>Log In</button>

    </div>

    <div class="container1">
        <!--<h1>aligned</h1>-->
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/logo.png" class="logo"/>
        <h3>Calculated connections.</h3>
        <p>It's like dating, but better. See what the skies may bring you as the stars align...</p>
        <div class="buttons">
            <button type="button" class="btn btn-outline-dark" id="signup-button"
            on:click={()=> page_tracker = "Signup"}>Sign Up</button>
        </div>
    </div>
</section>
</div>

<style>
    .image {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;

        background-color: white;
        background-image: url("https://i.imgur.com/VsIoeOJ.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        display: block;
    } 
    div.container1 {
        color: black;
        position: absolute;
        vertical-align: middle;
        top: 30%;
        left: 8%
    }
    .logo {
        height: 200px;
        width: auto
    }
    .nav-area {
        float: right;
        padding-right: 5%
    }
    .buttons {
        padding-top: 25px
    }
    #login-button {
        background-color: white;
        color: black;
        margin-top: 25px;
    }
    #signup-button {
        background-color: #39398e;
        color: white;
    }

    h3 {
        font-weight: bold;
        font-size: 200%;
    }
    p {
        font-size: large;
    }
</style>
