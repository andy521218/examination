<template>
    <div class="logo">
        <h1></h1>
        <span>首页</span>
    </div>
</template>

<script>
export default {
    name:'logo',

}
</script>

<style lang="scss">
.logo{
    position: relative;
    width: 50px;
    top: 30px;
    left: 40px;
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