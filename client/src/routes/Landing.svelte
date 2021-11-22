<section>
    <div class="container1">
        <!--<h1>aligned</h1>-->
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/logo.png" class="logo"/>
        <h3>Calculated connections.</h3>
        <p>It's like dating, but better. See what the skies may bring you as the stars align...</p>
    </div>

</section>

<style>
    :global(body) {
        background-color: pink;
        background-image: url('temp-bgd.jpg');
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
</style>