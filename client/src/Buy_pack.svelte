<script>
    export let packCount;
    let src = "images/buy-pack.jpg";
    
    function buyPackHandler(){
        packCount += 1;
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