<script>
    import Buy_pack from '../Buy_pack.svelte'
    import Open_pack from '../Open_pack.svelte'
    import {youser} from '../store.js';

    export let packCount = 15;
    export let page_tracker = "Packs";
    //TODO: add logic for calling backend to display user's actual pack count.
</script>

<section>
    <div class="pack-remains">
        <p>Packs remaining: {$youser.numPacks}</p>

        <p>Credits: {$youser.credits}</p>
    </div>
    <br>
    <br>
</section>

<section>
    <div class="container">
        <div class = "row">
            <div class = "col">
                <div class="open-pack">
                    <Open_pack bind:page_tracker={page_tracker}/>
                </div>
            </div>
            <div class="col">
                <div class="buy-pack">
                    <Buy_pack bind:uid={$youser.uid}/>
                </div>
            </div>
        </div>
    </div>
</section>


<style>
    .pack-remains{
        text-align: center;
    }
</style>









