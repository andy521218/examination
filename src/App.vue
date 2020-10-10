<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    window.onbeforeunload = function () {
      var storage = window.localStorage;
      storage.clear();
    };
  },
};
</script>