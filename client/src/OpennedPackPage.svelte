
<script>
    import Card from './Card.svelte';
    async function loadComponent(name) {
			console.log(`./${name}.svelte`);
        return await import(`./${name}.svelte`);
    }
    //const cards = [Card, Card, Card, Card, Card, Card, Card];

    
</script>



<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

    <center>
        <div class="container-fluid">
            <div class="cards-scroll">
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class="card">
                        <Card/>
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div> 
            </div>  
        </div>    
    </center>

<style>

.btn {
    margin-bottom: 40px;
}

.cards-scroll {
    overflow-x: scroll;
    white-space: nowrap;
}

.card-butt {
    display:inline-block;
}

.card {
    display:inline-block;
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 15px;
}
    
</style>