<template>
  <div>
     <discuss :dele='dele'></discuss>
      <turn-page></turn-page>
  </div>
</template>

<script>
import discuss from "../../components/discuss"
import turnPage from "../../components/turnPage"
export default {
  name: "message-forum",
  data(){
    return{
      dele:false
    }
  },
 components:{
   discuss,
   turnPage
 }
};
</script>
