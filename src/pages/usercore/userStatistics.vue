<template>
  <div class="user_statistics">
    <div class="statistics_title">
      <div class="statistics_left">
        <div class="casetrain" @click="tabCase(1)">
          案例训练
          <p :class="{ active: active == 1 }"></p>
        </div>
        <div class="caseexam" @click="tabCase(2)">
          正式考试
          <p :class="{ active: active == 2 }"></p>
        </div>
      </div>
      <div class="statistics_right" v-show="active == 1">
        <select class="select" v-model="diseaseType">
          <option v-for="(item, index) in list" :key="index" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <button class="submit" @click="search">检索</button>
      </div>
    </div>
    <div class="content">
      <case-tarin
        v-show="active == 1"
        :diseaseType="diseaseType"
        ref="caseTarin"
      ></case-tarin>
      <exam-case v-show="active == 2"></exam-case>
    </div>
  </div>
</template>

<script>
import caseTarin from "./statustics/caseTarin";
import examCase from "./statustics/examCase";
export default {
  name: "user-statistics",
  components: {
    caseTarin,
    examCase,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
      diseaseType: "1",
      active: "1",
    };
  },
  methods: {
    tabCase(index) {
      this.active = index;
    },
    search() {
      this.$refs.caseTarin.getreport();
    },
  },
};
</script>

<style lang="scss">
.user_statistics {
  width: 100%;
  height: 100%;
  .statistics_title {
    width: 99%;
    height: 90px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(9, 124, 168);
    display: flex;
    justify-content: space-between;
    .statistics_left,
    .statistics_right {
      display: flex;
      height: 100%;
      align-items: center;
      text-align: center;
    }
    .casetrain,
    .caseexam {
      font-size: 18px;
      font-weight: bold;
      width: 150px;
      height: 20px;
      position: relative;
      cursor: default;
      p {
        display: none;
        position: absolute;
        width: 100px;
        left: 25px;
        bottom: -20px;
        border: 3px solid rgb(0, 235, 255);
        border-radius: 3px;
      }
      .active {
        display: block;
      }
    }
    .statistics_right {
      margin-right: 10px;
      .submit {
        width: 115px;
      }
      .select {
        width: 150px;
        margin-right: 50px;
      }
    }
  }
  .content {
    height: 85%;
    width: 95%;
    margin: 0 auto;
  }
  .tarin_top_item_title {
    height: 49px;
    display: flex;
    align-items: center;
    position: relative;
    i {
      margin-top: 10px;
      margin-left: 20px;
      width: 25px;
      height: 49px;
      background: url("../../assets/public/0235255.png");
    }
    .orange {
      background: url("../../assets/public/25113894.png");
    }
    .violet {
      background: url("../../assets/public/171130255.png");
    }
    span {
      font-size: 17px;
      margin-left: 10px;
      font-weight: bold;
    }
    .train_bottom_right_total {
      position: absolute;
      right: 20px;
    }
  }
}
</style>

