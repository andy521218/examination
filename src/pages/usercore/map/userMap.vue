<template>
  <div class="user_map">
    <header>
      <ul>
        <li>
          <input
            type="radio"
            name="map"
            v-model="show"
            value="myanswer"
            @click="show = 'myanswer'"
          />
          <label>我的答案</label>
        </li>
        <li>
          <input type="radio" name="map" @click="show = 'contrast'" />
          <label>答案对比</label>
        </li>
        <li>
          <input type="radio" name="map" @click="show = 'correct'" />
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
      <my-map
        v-show="show == 'myanswer'"
        :ask="ask"
        :watch="watch"
        :listen="listen"
        :press="press"
        :pulse="pulse"
      ></my-map>
      <correct-map
        v-show="show == 'correct'"
        :ask="ask"
        :watch="watch"
        :listen="listen"
        :press="press"
        :pulse="pulse"
        :correct="correct"
      ></correct-map>
      <contrast-map
        v-show="show == 'contrast'"
        :ask="ask"
        :watch="watch"
        :listen="listen"
        :press="press"
        :pulse="pulse"
        :correct="correct"
      />
    </main>
  </div>
</template>

<script>
import correctMap from "./correctMap";
import myMap from "./myMap";
import contrastMap from "./contrastMap";
export default {
  name: "user-map",
  components: {
    correctMap,
    contrastMap,
    myMap,
  },
  data() {
    return {
      caseId: "",
      examNo: "",
      show: "myanswer",
      ask: [],
      watch: [],
      listen: [],
      press: [],
      pulse: [],
      correct: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getAsk();
    this.getWatch();
    this.getListen();
    this.getPress();
    this.getPulse();
    this.getcorrect();
  },
  methods: {
    getAsk() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          let asklist = [];
          for (let i = 0; i < res.data.length; i++) {
            asklist.push(
              new Promise((resolve) => {
                this.axios
                  .get(`/${this.examNo}/${this.caseId}/correctasked`, {
                    params: {
                      typeId: res.data[i].moduleId,
                    },
                  })
                  .then((res) => {
                    return resolve(res.data);
                  });
              })
            );
          }
          Promise.all(asklist).then((res) => {
            this.ask = [].concat(...res);
          });
        });
    },
    getWatch() {
      let watch = [];
      for (let i = 0; i < 3; i++) {
        this.axios
          .get(`/${this.examNo}/${this.caseId}/watched/${i}`)
          .then((res) => {
            try {
              res.data.forEach((item) => {
                watch.push(item);
              });
            } catch (error) {
              error;
            }
          });
      }
      this.watch = watch;
    },
    getListen() {
      this.axios.get(`/${this.examNo}/${this.caseId}/listened`).then((res) => {
        this.listen = res.data;
      });
    },
    getPress() {
      this.axios.get(`/${this.examNo}/${this.caseId}/press`).then((res) => {
        this.press = res.data;
      });
    },
    getPulse() {
      this.axios.get(`/${this.examNo}/${this.caseId}/pulse`).then((res) => {
        this.pulse = res.data;
      });
    },
    getcorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`)
        .then((res) => {
          this.correct = res;
        });
    },
  },
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
    div {
      width: 1420px;
      height: 700px;
      margin: 0 auto;
    }
  }
}
</style>