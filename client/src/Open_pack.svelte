<script>
    let src = "images/astro-card.webp";
    export let page_tracker = "Packs";
    //Need to call backend function to create a pack
    function openPackHandler(){
        page_tracker = "OpenPacks"

        //console.log("Open pack.");
    }   
</script>

<div>
<img {src} id="button" alt="Open a pack here!"/>
<br>
<br>
<div class="button">
<a href="/OpennedPack" class="btn btn-outline-dark">Open Pack</a>
</div>
</div>


<style>
    .button{
        margin-left:20%;
}
</style>