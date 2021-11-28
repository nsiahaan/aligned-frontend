<script>
    import {page} from '$app/stores';
    export let page_tracker = "Landing"
    // import Background from '../Background.svelte';
</script>


<div class="image">
<section>
    <div class="buttons" id="nav-area">
        <button type="button" class="btn btn-outline-light" id="login-button"
        on:click={()=> page_tracker = "Login"}>Log In</button>

    </div>

    <div class="container1">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/logo.png" class="logo"/>
        <h3>Calculated connections.</h3>
        <p>Dating, made better. See what the heavens may bring you as the stars align...</p>
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
        left: 6%
    }
    .logo {
        height: 200px;
        width: auto
    }
    #nav-area {
        float: right;
        padding-right: 4%;
        padding-top: 3%
    }
    .buttons {
        padding-top: 25px;
    }
    #login-button {
        background-color: white;
        color: black;
    }
    #signup-button {
        background-color: #39398e;
        color: white;
    }

    h3 {
        font-weight: bold;
        font-size: 200%;
        font-family: 'Open Sans', Arial, sans-serif;
    }
    p {
        font-size: large;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-size: 125%;
        font-weight: 400;
    }
</style>