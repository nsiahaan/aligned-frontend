<script>
    export let uid;
    let src = "images/card-light.png"; // "images/buy-pack.png";
    import { youser } from './store.js'
    import {onMount} from 'svelte';
    onMount(() => {
        youser.useLocalStorage();
    })
    
    function buyPackHandler(){
        let url = "http://127.0.0.1:5005/buyPack"
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: uid
            })
        }).then(response => {
            if (response.status != 200) { // not enough credits to buy a pack
                response.text()
                .then(text => {window.alert(text)})
            }
            else {
                callUser() // update youser so that "packs remaining" and "credits" reflect updated values
            }
        })
    }

    function callUser() {
        let url = "http://127.0.0.1:5005/list?uid=" + uid
        fetch(url)
        .then(d => d.json())
            .then(d => {
                youser.set(d)
            })
    }
</script>

<img {src} class="resize" alt="Buy a pack here!"/>
<!--two <br>'s were here-->
<div class="button">
<button class="btn btn-outline-light" on:click={buyPackHandler}>
    BUY PACK
</button>
</div>

<style>
    .resize {
        height: 450px; /* 560px */
        width: auto;
    }
    .button{
        float: center;
        text-align:center;
        font-family: "Helvetica Neue", Arial, sans-serif
    }
    img {
        margin: auto;
        display: block;
        width: 100%;
        height: 100%;
    }
</style>