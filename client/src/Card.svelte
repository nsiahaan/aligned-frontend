<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
    export let Picture = 'images/default_profile_pics/no-user.png';
    export let AstroPic;
    export let PersonalityPic;
    export let Name = "No Name";
    export let Astro = "None";
    export let Personality = "None";
    export let Age = 0;
    export let Gender = "None";
    export let Bio = "No info!!"

</script>
<div class="card" style="width: 25rem;">
    <div class='pics'>
        <img src={AstroPic} id="card-img-top1" alt="...">
        <img src={Picture} id="card-img-top2"  alt="...">
        <img src={PersonalityPic} id="card-img-top3" alt="...">
    </div>
    <div class="card-body">
    <h5 class="card-title">{Name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{Astro}  |  {Personality}</h6>
    <h6 class="card-subtitle mb-2 text-muted">{Age}, {Gender}</h6>
        <div class="bottom-text"> 
            <p class="card-text">About Me: <br> {Bio} </p>
        </div>
    </div>
</div>



  <style>
    .card{
        border:10px solid;
        border-color: #c9d7f8;
        height: 75vh;
    }
    .card-title {
        text-align: center;
    }
    .card-subtitle {
        text-align: center;
        font-size: 12px;
    }
    .card-text {
        text-align: center;
        margin:5px;
        height:35vh;
        white-space: normal;
        overflow-wrap: break-word;
        overflow-y:auto;
    }
    .card-text {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
    }
    .card-text::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
    .bottom-text {
        background-color: #c1b8ed;
        width:100%;
        height:35vh;
    }
    .card-body {
        padding: 0rem 0rem;
    }
    #card-img-top1{
        margin-left: 10px;
        width: 10%;
        float:left;
        margin-top:25%;
    }
    #card-img-top2{
        width:48%;
        margin:17px;
        margin-top:10px;
        margin-bottom: 5px;
        vertical-align: middle;
        border: 5px solid black;
        border-radius: 50%;
    }
    #card-img-top3{
        width: 12%;
        float:right;
        margin-top:22.5%;
        margin-right:10px;
    }
    .pics{
        display: inline-block;
        vertical-align: middle;
        height: 100%;
    }
  </style>