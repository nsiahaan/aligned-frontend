<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
</head>

<script>
  export let page = "Home";
  function setPageHome(){
    page = "Home";
  }
  function setPagePacks(){
    page = "Packs";
  }
  function setPageProfile(){
    page = "MyProfile";
  }
  function setPageAccount(){
    page = "Account";
  }
</script>

<section>
    <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" id="homelink" href="/#/home" on:click={setPageHome}>HOME</a>
          {#if page == "Home"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item">
          <a class="nav-link" id="packslink" href="/#/packs" on:click={setPagePacks}>PACKS</a>
          {#if page == "Packs"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item">
          <a class="nav-link" id="profilelink" href="/#/profile" on:click={setPageProfile}>PROFILE</a>
          {#if page == "MyProfile"}
            <div class="underline"></div>
          {/if}
        </li>
        <li class="nav-item">
          <a class="nav-link" id="accountlink" href="/#/account" on:click={setPageAccount}>ACCOUNT</a>
          {#if page == "Account"}
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
      height:4px;
      width:100%;
      background-color: #ffc2f8;
    }

</style>

