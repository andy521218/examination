<template>
  <div class="home">
    <header class="home_header">
       <user></user>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import user from "../components/user"
export default {
  name:'home',
  components:{
    user
  }
}
</script>
