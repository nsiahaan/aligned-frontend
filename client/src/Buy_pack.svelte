<script>
    export let userNumPacks;
    let src = "images/buy-pack.jpg"
    
    function buyPackHandler(){
        userNumPacks += 1;
    }
</script>

<img {src} class="resize" alt="Buy a pack here!"/>
<br>
<button class="button" on:click={buyPackHandler}>
    Buy Pack!
</button>

<style>
    .resize {
        height: 560px;
        width: auto;
    }
    .button{
        float: center;
        text-align:center;
    }
</style>