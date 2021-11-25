<script>
    export let uid;
    let src = "images/buy-pack.jpg";
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
        })
    }
    function callUser() {
        let url = "http://127.0.0.1:5005/list?uid=" + uid
        fetch(url)
        .then(d => d.json())
            .then(d => {
                youser.set(d)
                return d;
            })
    }
</script>

<img {src} class="resize" alt="Buy a pack here!"/>
<br>
<br>
<button class="btn btn-outline-dark" on:click={buyPackHandler} on:click={callUser}>
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