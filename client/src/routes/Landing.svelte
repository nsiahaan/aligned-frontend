<section>
    <div class="nav-area">
        <button type="button" class="btn btn-outline-dark">Log In</button>
    </div>

    <div class="container1">
        <!--<h1>aligned</h1>-->
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/logo.png" class="logo"/>
        <h3>Calculated connections.</h3>
        <p>It's like dating, but better. See what the skies may bring you as the stars align...</p>
        <div class="buttons">
            <button type="button" class="btn btn-outline-dark">Sign Up</button>
        </div>
    </div>
</section>

<style>
    :global(body) {
        background-color: pink;
        background-image: url("https://drive.google.com/file/d/1jNPUVDQKxyFmE7K2ivNhA3jRA3LZ4YJI/view");
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
</style>