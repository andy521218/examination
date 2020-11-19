<template>
  <div class="user_map">
    <header>
      <ul>
        <li>
          <input type="radio" name="map" />
          <label>我的答案</label>
        </li>
        <li>
          <input type="radio" name="map" />
          <label>答案对比</label>
        </li>
        <li>
          <input type="radio" name="map" />
          <label>正确答案</label>
        </li>
      </ul>
      <ul>
        <li>
          <i class="correct"></i>
          <span>正确答案</span>
        </li>
        <li>
          <i class="error"></i>
          <span>错误答案</span>
        </li>
        <li>
          <i class="forget"></i>
          <span>漏选答案</span>
        </li>
      </ul>
    </header>
    <main>
      <correct-map></correct-map>
    </main>
  </div>
</template>

<script>
import correctMap from "./correctMap";
export default {
  name: "user-map",
  components: {
    correctMap,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.user_map {
  padding: 1%;
  header {
    width: 98%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        align-items: center;
        label,
        span {
          margin-left: 5px;
          margin-right: 15px;
        }
        i {
          height: 30px;
          width: 15px;
        }
        .correct {
          background: rgb(0, 235, 255);
        }
        .error {
          background: rgb(254, 98, 102);
        }
        .forget {
          background: rgb(255, 200, 40);
        }
      }
    }
  }
  main {
    width: 100%;
    height: 710px;
  }
}
</style>