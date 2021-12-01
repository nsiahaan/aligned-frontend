<script>
    import Buy_pack from '../Buy_pack.svelte'
    import Open_pack from '../Open_pack.svelte'
    import {youser} from '../store.js';

    export let packCount = 15;
    export let page_tracker = "Packs";
    //TODO: add logic for calling backend to display user's actual pack count.
</script>

<div class="bgd-bgd">
    <div class='bgd'>
    <section>
        <div class="pack-remains">
            <p class="top-text">Packs Remaining - {$youser.numPacks}</p>
            <p class="top-text">Credits - {$youser.credits}</p>
        </div>

    <!-- there was a separate section here... -->

        <div class="whole">
        <div class="container">
            <div class = "row">
                <div class = "col">
                    <div class="open-pack">
                        <Open_pack bind:page_tracker={page_tracker}/>
                        <br>
                        
                    </div>
                </div>
                <div class="col">
                    <div class="buy-pack">
                        <Buy_pack bind:uid={$youser.uid}/>
                        <br>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>    
    </div> 
</div>


<style>
    .pack-remains{
        text-align: center;
    }
    .top-text{
        font-size:22px;
        font-weight: bold;
        color: black;
    } 
    .bgd-bgd {
        position: relative;
        height: auto;
        width: 100%;

        background-color: white;
        background-image: linear-gradient(180deg, white, #26265f); /*url("https://i.imgur.com/bkyh0rc.png"); /* linear-gradient(90deg, #26265f, white), url("https://i.imgur.com/FsvQwxC.png");*/
        background-repeat: no-repeat;
        background-size: 100% auto; /**100% auto*/
        display: block;
    }
</style>









