<script>
    const cards = [1,2,3,4,5,6,7]
</script>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<section>
    <center>
        <div class="container-fluid">
            <div class="cards-scroll">
                <div class="card-butt">
                    <div class=card>
                        {cards[0]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class=card>
                        {cards[1]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class=card>
                        {cards[2]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class=card>
                        {cards[3]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class=card>
                        {cards[4]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class=card>
                        {cards[5]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
                <div class="card-butt">
                    <div class=card>
                        {cards[6]}
                    </div>
                    <div><button type="button" class="btn btn-outline-dark">Match!</button>
                    </div>
                </div>
            </div>  
        </div>
    </center>
    
</section> 

<style>

.btn {
    margin-bottom: 40px;
}

.cards-scroll {
    overflow-x: auto;
    white-space: nowrap;
}

.card-butt {
    display:inline-block;
}

.card {
    display:inline-block;
    padding: 100px;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 30px;
}
    
</style>