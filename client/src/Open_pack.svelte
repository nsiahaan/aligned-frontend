<script>
    let src = "images/astro-card.webp";
    export let page = "Packs";
    //Need to call backend function to create a pack
    function openPackHandler(){
        page = "OpenPacks"
        //console.log("Open pack.");
    }   
</script>


<img {src} alt="Open a pack here!"/>
<br>
<button on:click={openPackHandler}>
    Open Pack!
</button>
