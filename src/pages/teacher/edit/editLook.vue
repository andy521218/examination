<template>
  <div class="case_layout">
    <div class="case_left">
      <header>
        <img src="../../../assets/public/timg1.jpg" alt="" />
        <ul>
          <li>
            <span>姓名:</span>
            <span>张三</span>
          </li>
          <li>
            <span>病系:</span>
            <span>肝病系</span>
          </li>
          <li>
            <span>性别:</span>
            <span>女</span>
          </li>
          <li>
            <span>年龄:</span>
            <span>75岁</span>
          </li>
          <li>
            <span>工作:</span>
            <span>退休人员</span>
          </li>
        </ul>
      </header>
      <main>
        <ul>
          <li v-for="(item, index) in tab" :key="index">{{ item }}</li>
          
        </ul>
      </main>
    </div>
    <div class="case_right"></div>
  </div>
</template>


<script>
export default {
  name: "edit-look",
  data() {
    return {
      tab: ["主诉", "现病史", "疾病史", "个人史", "婚育史", "家族史"],
    };
  },
};
</script>

<style lang="scss">
.case_layout {
  width: 100%;
  height: 100%;
  .case_left {
    width: 1140px;
    height: 100%;
    header {
      display: flex;
      width: 100%;
      height: 95px;
      img {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        margin-right: 35px;
        margin-left: 40px;
      }
      ul {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        li {
          width: 33%;
          height: 45px;
          span {
            display: inline-block;
            height: 45px;
            line-height: 45px;
          }
        }
      }
    }
    main {
      width: 100%;
      height: 615px;
      margin-top: 20px;
      ul{
          display: flex;
          li{
              width: 100px;
          }
      }
    }
  }
}
</style>