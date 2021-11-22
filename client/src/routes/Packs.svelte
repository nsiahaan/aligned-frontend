<script>
    import Buy_pack from '../Buy_pack.svelte'
    import Open_pack from '../Open_pack.svelte'

    export let packCount = 15;
    export let page_tracker = "Packs";
    //TODO: add logic for calling backend to display user's actual pack count.
</script>

<section>
    <div class="pack-remains">
        Packs remaining: {packCount}
    </div>
    <br>
    <br>
</section>

<section>
    <div class="grid-container">
        <div class="open-pack">
            <Open_pack bind:page_tracker={page_tracker}/>
        </div>

        <div class="buy-pack">
            <Buy_pack bind:packCount={packCount}/>
        </div>
    </div>
</section>


<style>
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        justify-items: center;
        text-align: center;
    }
    .pack-remains{
        text-align: center;
    }
</style>









