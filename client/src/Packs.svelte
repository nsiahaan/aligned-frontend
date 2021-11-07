<script>
    import App from './App.svelte'
import Buy_pack from './Buy_pack.svelte'
    import Open_pack from './Open_pack.svelte'

</script>



<div class="grid-container">
    <div class="open-pack">
        <Open_pack/>
    </div>

    <div class="buy-pack">
        <Buy_pack/>
    </div>
</div>


<style>
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        justify-items: center;
    }
</style>









