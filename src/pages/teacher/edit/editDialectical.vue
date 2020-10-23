<template>
  <div class="case_dialectical">
    <div class="dialectical_layout_left" v-show="step">
      <div class="title">病史合成</div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="container(index)"
        >
          {{ item }}
          <div :class="{ active: typeId == index }"></div>
        </li>
      </ul>
      <div class="scrollbar">
        <ul class="main_cont">
          <li>您有什么地方不舒服?---- 自觉心慌</li>
          <li>您有什么地方不舒服?---- 自觉心慌</li>
          <li>您有什么地方不舒服?---- 自觉心慌</li>
          <li>您有什么地方不舒服?---- 自觉心慌</li>
          <li>您有什么地方不舒服?---- 自觉心慌</li>
          <li>您有什么地方不舒服?---- 自觉心慌</li>
        </ul>
      </div>
    </div>
    <div class="dialectical_layout_right" v-show="step">
      <ul>
        <li><p class="tips">提示:根据病史合成选择病名和证型</p></li>
        <li>病名</li>
        <li>
          <div class="search">
            <input type="text" class="text_box" />
            <div class="search_down scrollbar">
              <div class="search_down_cont">
                <div class="search_item">1</div>
                <div class="search_item">1</div>
                <div class="search_item">1</div>
              </div>
            </div>
          </div>
        </li>
        <li>证型</li>
        <li class="layout">
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
        </li>
      </ul>
      <button class="edit_submit" @click="changeView">下一步</button>
    </div>

    <!-- 步骤2 -->
    <div class="dialectical_layout_left_two" v-show="!step">
      <div class="title">病名:肝郁气滞证</div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="container(index)"
        >
          {{ item }}
          <div :class="{ active: typeId == index }"></div>
        </li>
      </ul>
      <div class="scrollbar">
        <ul class="main_cont">
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
        </ul>
      </div>
    </div>
    <div class="dialectical_layout_right_two" v-show="!step">
      <div class="title">
        病名:
        <div>
          <input type="checkbox" />
          <label for="">症型1</label>
        </div>
        <div>
          <input type="checkbox" />
          <label for="">症型1</label>
        </div>
        <div>
          <input type="checkbox" />
          <label for="">症型1</label>
        </div>
      </div>
      <div class="scrollbar">
        <ul class="main_cont">
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
        </ul>
      </div>
    </div>
    <button class="edit_submit" @click="changeView" v-show="!step">
      上一步
    </button>
  </div>
</template>

<script>
export default {
  name: "edit-dialectical",
  data() {
    return {
      tab: ["望", "闻", "问", "切"],
      typeId: "",
      step: true,
    };
  },
  methods: {
    container(i) {
      this.typeId = i;
    },
    changeView() {
      this.step = !this.step;
    },
  },
};
</script>

<style lang="scss">
.case_dialectical {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .dialectical_layout_left {
    width: 55%;
    height: 100%;
    background-color: rgb(5, 61, 118, 0.3);
    border: 1px solid rgb(9, 124, 168);
    .title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
    }
  }
  .dialectical_layout_right {
    width: 44%;
    height: 100%;
    position: relative;
    margin-left: 1%;
    border-left: 2px solid rgb(9, 124, 168);
    ul {
      width: 97%;
      margin-left: 3%;
      li {
        margin-top: 20px;
        .tips {
          float: right;
        }
        .search {
          position: relative;
          input {
            width: 100%;
          }
          .search_down{
            width: 100%;
          }
        }
      }
      .layout {
        display: flex;
        flex-wrap: wrap;
        div {
          margin-bottom: 20px;
          width: 175px;
        }
      }
    }
  }

  .dialectical_layout_left_two,
  .dialectical_layout_right_two {
    width: 49%;
    height: 90%;
    background: url("../../../assets/public/contbg.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      padding-left: 45px;
      display: flex;
      border-bottom: 1px solid rgb(9, 124, 168);
      div {
        width: 100px;
        margin-left: 15px;
      }
    }
    .main_tab {
      margin: 0;
    }
  }

  .dialectical_layout_left_two {
    margin-right: 2%;
  }

  //   公共样式
  .edit_submit {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .main_tab {
    display: flex;
    margin-top: 25px;
    position: relative;
    margin-left: 15px;

    .item_title {
      cursor: pointer;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-left: 20px;
      font-size: 18px;
      position: relative;
    }

    .active {
      position: absolute;
      width: 50px;
      bottom: -5px;
      left: 0;
      border: 3px solid rgb(0, 235, 255);
      border-radius: 3px;
    }
  }
  .main_cont {
    width: 98%;
    height: 585px;
    overflow-y: auto;
    margin: 20px auto;
    li {
      line-height: 45px;
      height: 45px;
      padding-left: 15px;
    }
  }
}
</style>


