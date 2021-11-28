<section>
    <div class="nav-area">
        <button type="button" class="btn btn-outline-light" id="login-button">Log In</button>
    </div>

    <div class="container1">
        <!--<h1>aligned</h1>-->
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/logo.png" class="logo"/>
        <h3>Calculated connections.</h3>
        <p>It's like dating, but better. See what the heavens may bring you as the stars align...</p>
        <div class="buttons">
            <button type="button" class="btn btn-outline-dark" id="signup-button">Sign Up</button>
        </div>
    </div>
</section>

<style>
    :global(body) {
        background-color: white;
        background-image: url("https://i.imgur.com/VsIoeOJ.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
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