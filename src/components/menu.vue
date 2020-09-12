<template>
    <div class="menu">
       <ul>
           <li v-for="(item,index) in menuData" :key='index' :class="{'active':bgIndex==index}" @click="linkRouting(index)">{{item}}</li>
       </ul>
    </div>
</template>

<script>
export default {
    name:'menu-tab',
    props:['menuData'],
    data(){
        return{
            bgIndex:'-1',
            arrRouter:['usercenter','userpassword','userrecord','userachievement','userstatistics']
        }
    },
    methods:{
        linkRouting(index){
            this.bgIndex=index;
            this.$router.push(this.arrRouter[index])
        }
    }
}
</script>

<style lang="scss">
.menu{
    width: 157px;
    li{
        cursor: pointer;
        width: 100%;
        height: 54px;
        line-height: 54px;
        margin-bottom: 29px;
        text-align: center;
        font-size: 20px;
        background: url('../assets/public/menu.png');
    }
    li:hover{
        background: url('../assets/public/menumove.png');
    }
    .active{
        background: url('../assets/public/menumove.png');
    }
}
</style>