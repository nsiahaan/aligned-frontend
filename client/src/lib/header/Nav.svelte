<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>

  import {page} from '$app/stores';

  export let page_tracker = "Home";
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

<section>
    <ul class="nav">
        <li class="nav-item" class:active={$page.path === '/Home'}>
          <a class="nav-link" id="homelink" href="/Home" on:click={setpage_trackerHome}>HOME</a>
          {#if page_tracker == "Home"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item" class:active={$page.path === '/Packs'}>
          <a class="nav-link" id="packslink" href="/Packs" on:click={setpage_trackerPacks}>PACKS</a>
          {#if page_tracker == "Packs"}
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

<style>
    .nav-link {
        color:black;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 30px;
        text-align: center;
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

