<template>
  <div id="mountNode">
    <ul>
      <li v-for="(item, index) in askData" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in watchData" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in listenData" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in pressData" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li>
        {{ pulseData }}
      </li>
    </ul>
  </div>
</template>

<script>
// import G6 from "@antv/g6";
export default {
  name: "correct-map",

  data() {
    return {
      caseId: "",
      examNo: "",
      askData: [],
      ask: [],
      watchData: [],
      watch: [],
      listenData: [],
      listen: [],
      pressData: [],
      press: [],
      pulseData: [],
      pulse: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getcorrect();
  },
  methods: {
    getcorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`)
        .then((res) => {
          console.log(res);
          let ask, watch, listen, feel;
          // 病名
          try {
            res.data.diseaseNameIssues.forEach((item) => {
              if (item.stageId == "1") {
                ask = item.issueIds;
              }
              if (item.stageId == "2") {
                watch = item.issueIds;
              }
              if (item.stageId == "3") {
                listen = item.issueIds;
              }
              if (item.stageId == "4") {
                feel = item.issueIds;
              }
            });
          } catch (error) {
            error;
          }
          // 问诊

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
                try {
                  this.ask.forEach((item) => {
                    ask.forEach((ele) => {
                      if (ele == item.id) {
                        this.askData.push(item);
                      }
                    });
                  });
                } catch (error) {
                  error;
                }
              });
            });

          // 望诊
          for (let i = 0; i < 3; i++) {
            this.axios
              .get(`/${this.examNo}/${this.caseId}/watched/${i}`)
              .then((res) => {
                try {
                  res.data.forEach((item) => {
                    this.watch.push(item);
                    watch.forEach((ele) => {
                      if (item.id == ele) {
                        this.watchData.push(item);
                      }
                    });
                  });
                } catch (error) {
                  error;
                }
              });
          }

          // 闻诊
          this.axios
            .get(`/${this.examNo}/${this.caseId}/listened`)
            .then((res) => {
              this.listen = res.data;
              try {
                res.data.forEach((item) => {
                  listen.forEach((ele) => {
                    if (item.id == ele) {
                      this.listenData.push(ele);
                    }
                  });
                });
              } catch (error) {
                error;
              }
            });
          //获取切诊
          this.axios.get(`/${this.examNo}/${this.caseId}/press`).then((res) => {
            this.press = res.data;
            try {
              feel.forEach((ele) => {
                res.data.forEach((item) => {
                  if (ele == item.id) {
                    this.pressData.push(item);
                  }
                });
              });
            } catch (error) {
              error;
            }
          });
          // 脉诊
          this.axios.get(`/${this.examNo}/${this.caseId}/pulse`).then((res) => {
            this.pulse = res.data;
            try {
              feel.forEach((item) => {
                if (res.data.id == item) {
                  this.pulseData = res.data;
                }
              });
            } catch (error) {
              error;
            }
          });
        });

      // 病症
    },
  },
};
</script>