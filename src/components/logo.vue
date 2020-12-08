<template>
  <div class="logo" @click="link">
    <h1 v-if="authority != 'ADMIN' && exam == null"></h1>
    <span v-if="authority != 'ADMIN' && exam == null">首页</span>
  </div>
</template>

<script>
export default {
  name: "logo",
  props: ["exam"],
  data() {
    return {
      authority: "",
    };
  },
  methods: {
    link() {
      if (this.authority == "STUDENT") {
        let url = window.location.href;
        if (
          /userask/.test(url) ||
          /userlook/.test(url) ||
          /userHear/.test(url) ||
          /usercut/.test(url) ||
          /userdialectical/.test(url) ||
          /usertreatment/.test(url)
        ) {
          this.$parent.index_show = true;
          return;
        }
      }
      this.$router.push("/index");
    },
  },
  mounted() {
    this.authority = localStorage.getItem("authority");
  },
};
</script>

<style lang="scss">
.logo {
  position: relative;
  width: 50px;
  top: 25px;
  left: 40px;
  display: inline-block;
  cursor: pointer;
  h1 {
    width: 38px;
    height: 26px;
    background: url("../assets/public/home.png") no-repeat center;
    background-size: 100% 100%;
  }
  span {
    display: block;
    width: 38px;
    text-align: center;
  }
}
</style>