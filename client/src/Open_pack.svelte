<script>
    let src = "images/astro-card.webp";

    //Need to call backend function to create a pack
    function openPackHandler(){
        //console.log("Open pack.");
    }   
</script>


<img {src} alt="Open a pack here!"/>
<br>
<button on:click={openPackHandler}>
    Open Pack!
</button>
