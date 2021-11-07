<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script> 
    let src = "images/kanye-profile-pic.png";

</script>

<section>
    <div class="big-box">
        <div class="container">
            <div class="row">
                <div class="col">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <div class="center"> 
                        <img {src} class="resize" alt="Profile Picture is displayed here"/>
                    </div>
                </div>
                <div class="col-8">
                    <br>
                    <div class="dropdown d-flex align-items-end justify-content-end">
                        <button class="btn btn-secondary rounded" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                        <li><a class="dropdown-item" href="#">Take Personality Test</a></li>
                        </ul>
                    </div>
                    <p> Name: </p>
                    <p> MBTI: </p>
                    <p> Star Sign: </p>
                    <p> This is my cute profile description. I like peen and vajayjay.
                    
                    </p>
                </div>
            </div>
            <div class="row horoscope-wrapper">
                <br>
                <p> Daily Horoscope </p>
                <div class="container">
                    
                </div>
            </div>
            <div class="row horoscope">
                This is where my horoscope will be.
            </div>
            <div class="row horoscope">
                <div class="col">
                Love Compatibility
                </div>
                <div class="col">
                Mood
                </div>
                <div class="col">
                Lucky Number
                </div>
                <div class="col">
                Lucky Color
                </div>
            </div>
        </div> 
    </div>
</section>




<style>
    .rounded{
        border-radius: 100% !important;
        background-color: white;
        color: black;
    }
    .center{
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .resize {
        height: 300px;
        width: auto;
        margin: auto;
    }
    .big-box{
        background-color: #c1b8ed;
        height: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        padding: 3em;
    }

    .row{
        background-color: #c1b8ed;
        outline-style: solid;
    }

    .horoscope {
        background-color: white !important;
    }

    .horoscope-wrapper{
        text-align: center;
    }
    .col{
        outline-style: solid;
    }
</style>