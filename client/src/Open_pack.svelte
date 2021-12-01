<script>
    let src = "images/card-dark.png"; // "images/astro-card.webp";
    export let page_tracker = "Packs";
    //Need to call backend function to create a pack
    function openPackHandler(){
        page_tracker = "OpenPacks"

        //console.log("Open pack.");
    }   
</script>

<div>
    <img {src} id="button" alt="Open a pack here!"/>
    <div class="button">
        <a href="/OpennedPack" class="btn btn-outline-light">OPEN PACK</a> <!--btn btn-outline-dark, round-button -->
    </div>
</div>


<style>
    .button{
        text-align: center;
        float: center;
        font-family: "Helvetica Neue", Arial, sans-serif;
    }
    img {
        margin: auto;
        display: block;
        height: 450px;
        width: auto;
    }
</style>