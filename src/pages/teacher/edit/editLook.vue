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
          <li
            v-for="(item, index) in tab"
            :key="index"
            @click="container(index)"
          >
            {{ item }}
            <div :class="{ active: tabIndex == index }"></div>
          </li>
          <i></i>
        </ul>
        <div class="content scrollbar">
          <div class="content_scrollbar">
           <ul>
             <li>
               <div class="item_cont"></div>
               <div class="item_edit"></div>
             </li>
           </ul>
          </div>
        </div>
        <div class="content_bottom"></div>
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
      tabIndex: "",
    };
  },
  methods: {
    container(i) {
      this.tabIndex = i;
    },
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
      background-color: rgb(5, 61, 118, 0.3);
      border: rgb(9, 124, 168) 1px solid;
      ul {
        display: flex;
        margin-top: 25px;
        position: relative;
        li {
          cursor: pointer;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-left: 20px;
          font-size: 18px;
          position: relative;
        }
        .active {
          position: absolute;
          width: 80px;
          bottom: -5px;
          left: 0;
          border: 3px solid rgb(0, 235, 255);
          border-radius: 3px;
        }
        i {
          background: url("../../../assets/public/time.png") no-repeat center;
          width: 30px;
          height: 30px;
          position: absolute;
          right: 20px;
          top: -5px;
        }
      }
      .content {
        width: 100%;
        height: 468px;
        margin-top: 30px;
        .content_scrollbar {
          overflow-y: auto;
          height: 468px;
          width: 99%;
          div {
            height: 300px;
          }
        }
      }
      .content_bottom {
        height: 40px;
        margin-top: 10px;
        background: salmon;
      }
    }
  }
}
</style>