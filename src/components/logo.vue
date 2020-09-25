<template>
    <div class="logo" @click="link">
        <h1></h1>
        <span >首页</span>
    </div>
</template>

<script>
export default {
    name:'logo',
    methods:{
        link(){
            this.$router.push('/index')
        }
    }
}
</script>

<style lang="scss">
.logo{
    position: relative;
    width: 50px;
    top: 25px;
    left: 40px;
    display: inline-block;
    cursor: pointer;
    h1{
        width: 38px;
        height: 26px;
        background: url('../assets/public/home.png') no-repeat center;
        background-size: 100% 100%;
    }
    span{
        display: block;
        width: 38px;
        text-align: center;
    }
}
</style>