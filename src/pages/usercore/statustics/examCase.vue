<template>
  <div class="case_exam">
    <div class="case_exam_top">
      <div class="case_exam_examumber">
        <div class="tarin_top_item_title">
          <i></i>
          <span>考试成绩</span>
          <p class="train_bottom_right_people">分数</p>
          <div class="tarin_top_item_title_itps">注:滚动鼠标滑轮翻页</div>
        </div>
        <img
          v-show="exam_show"
          class="case_exam_top_itps"
          src="../../../assets/public/number.png"
          alt=""
        />
        <div class="case_exam_main_number">
          <div
            class="case_exam_main_number_block"
            v-for="(item, index) in score"
            :key="index"
          >
            <span>{{ parseInt(item.score) }}分</span>
            <img
              :style="{ height: item.height + 'px' }"
              src="../../../assets/public/numberblock.png"
              alt=""
            />
          </div>
        </div>
        <div class="case_exam_examumber_list">
          <span v-for="(item, index) in name" :key="index">{{
            index | sortNumber(page)
          }}</span>
        </div>
      </div>
      <div class="caee_exam_classrommsort">
        <div class="tarin_top_item_title">
          <i class="violet"></i>
          <span>班级排名</span>
          <div class="tarin_top_item_title_itps">注:滚动鼠标滑轮翻页</div>
        </div>
        <img
          v-show="classroom_show"
          class="case_exam_top_itps"
          src="../../../assets/public/number.png"
          alt=""
        />
        <div class="case_exam_main_classroom"></div>
      </div>
    </div>
    <div class="case_exam_bottom">
      <ul>
        <li v-for="(item, index) in name" :key="index">
          <p>{{ index }}</p>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-exam",
  data() {
    return {
      exam_show: true,
      classroom_show: true,
      size: 10,
      page: "1",
      name: [],
      rank: [],
      score: [],
      time: "",
    };
  },
  mounted() {
    this.getReport();
    window.addEventListener("mousewheel", this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        if (e.wheelDelta > 1) {
          this.page++;
          this.getReport();
        } else {
          this.page--;
          this.getReport();
        }
      }, 800);
    },
    getReport() {
      this.name = [];
      this.rank = [];
      this.score = [];
      this.axios
        .get("/my/exam/report", {
          params: {
            size: this.size,
          },
        })
        .then((res) => {
          this.name = [];
          this.rank = [];
          this.score = [];
          if (res.data.length == 0) {
            this.exam_show = true;
          } else {
            this.exam_show = false;
          }
          res.data.forEach((item) => {
            this.name.push(item.name);
            this.rank.push(item.rank);
            this.score.push({
              score: item.score,
              height: (item.score / 100) * 435,
            });
          });
        });
    },
  },
  watch: {
    page: function () {
      this.getReport();
    },
  },
};
</script>

<style lang="scss">
.case_exam {
  width: 100%;
  height: 100%;
  margin-top: 1%;
  .tarin_top_item_title_itps {
    position: absolute;
    right: 15px;
  }
  .train_bottom_right_people {
    position: absolute;
    top: 65px;
    left: 28px;
  }
  .case_exam_top {
    width: 100%;
    height: 90%;
    display: flex;
    .case_exam_examumber {
      width: 49%;
      height: 100%;
      background: cadetblue;
      background: url("../../../assets/public/background.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      .case_exam_main_number {
        border: 1px solid rgb(9, 124, 168);
        border-top: none;
        border-right: none;
        width: 90%;
        height: 75%;
        margin: 6% auto 0 auto;
        display: flex;
        .case_exam_main_number_block {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 11.1%;
          justify-content: flex-end;
          img {
            width: 25px;
            height: 25px;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;
          }
        }
      }
      .case_exam_examumber_list {
        width: 90%;
        height: 8%;
        margin: 0 auto;
        display: flex;
        text-align: center;
        align-items: center;
        position: relative;
        span {
          width: 11.1%;
        }
      }
    }
    .caee_exam_classrommsort {
      background: url("../../../assets/public/background.png") no-repeat center;
      background-size: 100% 100%;
      margin-left: 2%;
      width: 49%;
      height: 100%;
      position: relative;
    }
    .case_exam_top_itps {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -98px;
      margin-left: -127px;
    }
  }
  .case_exam_bottom {
    width: 100%;
    height: 10%;
    ul {
      width: 100%;
      height: 100%;
      align-items: center;
      display: flex;
      li {
        display: flex;
        width: 10%;
        p {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: rgb(30, 172, 255);
          border-radius: 3px;
          margin-right: 5px;
        }
      }
      li:first-child {
        margin-left: 20px;
      }
    }
  }
}
</style>