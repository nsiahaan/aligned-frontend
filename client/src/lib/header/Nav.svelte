<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>

  import {page} from '$app/stores';

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

// variable that control whether mobile menu is open or closed
let isOpen = false;
</script>

<section>
  <nav class="navbar navbar-expand-lg nav navbar-light justify-content-center">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item p-3" class:active={$page.path === '/Home'}>
            <a class="nav-link" id="homelink" href="/Home" on:click={setpage_trackerHome}>HOME</a>
            {#if page_tracker == "Home"}
              <div class="underline"></div>
            {/if}
          </li>
          <li class="nav-item p-3" class:active={$page.path === '/Packs' || $page.path === '/OpennedPack'}>
            <a class="nav-link" id="packslink" href="/Packs" on:click={setpage_trackerPacks}>PACKS</a>
            {#if page_tracker == "Packs" || page_tracker == "OpennedPack"}
              <div class="underline"></div>
            {/if}
          </li>
          <li class="nav-item p-3" class:active={$page.path === '/MyProfile'}>
            <a sveltekit:prefetch class="nav-link" id="profilelink" href="/MyProfile" on:click={setpage_trackerProfile}>PROFILE</a>
            {#if page_tracker == "MyProfile"}
              <div class="underline"></div>
            {/if}
          </li>
          <li class="nav-item p-3" class:active={$page.path === '/MyAccount'}>
            <a sveltekit:prefetch class="nav-link" id="accountlink" href="/MyAccount" on:click={setpage_trackerAccount}>ACCOUNT</a>
            {#if page_tracker == "Account"}
              <div class="underline"></div>
            {/if}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</section>

<!--- Old navbar
<section>
    <ul class="navbar nav navbar-collapse">
        <li class="nav-item" class:active={$page.path === '/Home'}>
          <a class="nav-link" id="homelink" href="/Home" on:click={setpage_trackerHome}>HOME</a>
          {#if page_tracker == "Home"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item" class:active={$page.path === '/Packs' || $page.path === '/OpennedPack'}>
          <a class="nav-link" id="packslink" href="/Packs" on:click={setpage_trackerPacks}>PACKS</a>
          {#if page_tracker == "Packs" || page_tracker == "OpennedPack"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item" class:active={$page.path === '/MyProfile'}>
          <a sveltekit:prefetch class="nav-link" id="profilelink" href="/MyProfile" on:click={setpage_trackerProfile}>PROFILE</a>
          {#if page_tracker == "MyProfile"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item" class:active={$page.path === '/MyAccount'}>
          <a sveltekit:prefetch class="nav-link" id="accountlink" href="/MyAccount" on:click={setpage_trackerAccount}>ACCOUNT</a>
          {#if page_tracker == "Account"}
            <div class="underline"></div>
          {/if}
        </li>
      </ul>
</section> 
-->


<style>
    .nav-item{
      color: black !important;
    }
    .nav-link {
        color:black !important;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 30px;
        text-align: center;
    }
    .nav-link:hover{
      color:#ffc2f8;
      text-decoration: none;
    }
    .nav{
        margin: auto;
        width: 50%;
        padding: 10px;
        text-align: center;
    }
    .underline {
      margin-top: -13px;
      height:4px;
      width:100%;
      background-color: #ffc2f8;
    }

</style>

