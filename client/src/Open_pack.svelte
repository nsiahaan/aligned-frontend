<script>
    let src = "images/astro-card.webp";
    export let page_tracker = "Packs";
    //Need to call backend function to create a pack
    function openPackHandler(){
        page_tracker = "OpenPacks"

        //console.log("Open pack.");
    }   
</script>


<img {src} alt="Open a pack here!"/>
<br>
<button on:click={openPackHandler}> <a href = "/OpennedPack">
    Open Pack!
</button>
