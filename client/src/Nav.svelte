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
          <a class="nav-link" href="/#/home" on:click={setPageHome}>HOME</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/packs" on:click={setPagePacks}>PACKS</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/profile" on:click={setPageProfile}>PROFILE</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/account" on:click={setPageAccount}>ACCOUNT</a>
        </li>
      </ul>
</section> 

<style>
    .nav-link {
        color:black;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 30px;
    }
    .nav{
        margin: auto;
        width: 50%;
        padding: 10px;
    }

</style>

