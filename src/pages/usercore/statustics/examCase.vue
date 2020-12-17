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
          <p class="train_bottom_right_people">名次</p>
          <div class="tarin_top_item_title_itps">注:滚动鼠标滑轮翻页</div>
        </div>
        <img
          v-show="!classroom_show"
          class="case_exam_top_itps"
          src="../../../assets/public/number.png"
          alt=""
        />
        <div class="case_exam_main_classroom">
          <canvas id="canvas" width="700" height="445"></canvas>
        </div>
        <div class="case_exam_main_classroom_list">
          <span v-for="(item, index) in name" :key="index">{{
            index | sortNumber(page)
          }}</span>
        </div>
      </div>
    </div>
    <div class="case_exam_bottom">
      <ul>
        <li v-for="(item, index) in itemName" :key="index">
          <p>{{ index | sortNumber(page) }}</p>
          <span>{{ item.name }}</span>
          <span
            style="color: rgb(252, 94, 95); margin-left: 5px"
            v-if="item.flag == 0"
            >(缺考)</span
          >
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
      sortHeight: [],
      itemName: [],
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
      if (this.name.length < 10) {
        if (e.wheelDelta < 1) {
          return;
        }
      }
      if (this.page == "1") {
        if (e.wheelDelta > 1) {
          return;
        }
      }
      this.time = setTimeout(() => {
        if (e.wheelDelta > 1) {
          this.page--;
          this.getReport();
        } else {
          this.page++;
          this.getReport();
        }
      }, 800);
    },
    getReport() {
      this.axios
        .get("/my/exam/report", {
          params: {
            size: this.size,
            page: this.page,
          },
        })
        .then((res) => {
          this.itemName = res.data.rows;
          this.name = [];
          this.rank = [];
          this.score = [];
          if (res.data.length == 0) {
            this.exam_show = true;
            return;
          } else {
            this.exam_show = false;
          }
          res.data.rows.forEach((item, index) => {
            this.name.push(item.name);
            this.rank.push(item.rank);
            this.score.push({
              score: item.score,
              height: (item.score / 100) * 435,
            });
            if (res.data.rows.length - 1 == index) {
              this.classroomSort();
            }
          });
        });
    },
    classroomSort() {
      this.sortHeight = [];
      let canvas = document.getElementById("canvas");
      let arr = JSON.parse(JSON.stringify(this.rank));
      arr = arr.sort();
      let min = arr[0],
        max = arr[arr.length - 1];
      this.itemName.forEach((item, index) => {
        if (item.flag == 0) {
          this.rank[index] = max;
        }
      });
      this.rank.forEach((item) => {
        if (item == 1) {
          this.sortHeight.push(50);
        } else if (item == max) {
          this.sortHeight.push(425);
        } else {
          this.sortHeight.push((item / (max - min)) * 222 + 20);
        }
      });
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgb(0,235,255)";
      ctx.font = "18px Arial";
      ctx.fillStyle = "rgb(60,190,250)";
      ctx.beginPath();
      let x = 38.5;
      this.sortHeight.forEach((item, index) => {
        ctx.lineTo(x, item);
        ctx.fillText(this.rank[index] + "名", x - 15, item - 15);
        let img = new Image();
        img.src = `http://localhost:8080/api/download/61/1608018030700.png`;
        (() => {
          let img_x = x;
          img.onload = () => {
            ctx.drawImage(img, img_x - 10, item - 10, 20, 20);
          };
        })();
        x += 69;
        if (this.sortHeight.length - 1 == index) {
          ctx.stroke();
        }
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

      .case_exam_top_itps {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -98px;
        margin-left: -127px;
      }
      .case_exam_main_classroom {
        width: 90%;
        height: 75%;
        margin: 6% auto 0 auto;
        border: 1px solid rgb(9, 124, 168);
        border-top: none;
        border-right: none;
      }
      .case_exam_main_classroom_list {
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