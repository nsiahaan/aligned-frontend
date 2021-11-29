<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
  export let page_tracker = window.location.pathname.replace(/[^\w\s]/gi, '');
  function setpage_trackerHome(){
    page_tracker = "Home";
  }
  function setpage_trackerPacks(){
    page_tracker = "Packs";
  }
  function setpage_trackerProfile(){
    page_tracker = "MyProfile";
  }
  function setpage_trackerAccount(){
    page_tracker = "Account";
  }
</script>

<div class="logo">
  <img src="images/logo-black-crop.png" alt="logo"/>
</div>

<section>
    <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" id="homelink" on:click={setpage_trackerHome}>HOME</a>
          {#if page_tracker == "Home"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item">

          <a class="nav-link" id="packslink" href="/#/packs" on:click={setpage_trackerPacks}>PACKS</a>
          {#if page_tracker == "Packs" || page_tracker == "OpenPacks"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profilelink" on:click={setpage_trackerProfile}>PROFILE</a>
          {#if page_tracker == "MyProfile"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item">
          <a class="nav-link" id="accountlink" on:click={setpage_trackerAccount}>ACCOUNT</a>
          {#if page_tracker == "Account"}
            <div class="underline"></div>
          {/if}
        </li>
      </ul>
</section> 

<style>
    .nav-link {
        color:black;
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-size: 30px;
        font-weight: bold;
    }
    .nav-link:hover{
      color:#ffc2f8;
      text-decoration: none;
    }
    .nav{
        margin: auto;
        width: 50%;
        padding: 10px;
    }
    .underline {
      margin-top: -13px;
      height: 4px;
      width: 100%;
      background-color: #ffc2f8;
    }
    .logo {
      background-color: blue;
      margin-top: 5%;
      position: absolute;
      left: 50%;
    }

</style>

