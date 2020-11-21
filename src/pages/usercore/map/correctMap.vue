<template>
  <div id="correct" ref="correct"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "correct-map",
  props: ["ask", "watch", "listen", "press", "pulse"],
  data() {
    return {
      mapData: {
        nodes: [
          {
            id: "0",
            label: "范再娟",
          },
          {
            id: "1.0",
            label: "问",
            size: [25, 30],
          },
          {
            id: "2.0",
            label: "望",
            size: [25, 30],
          },
          {
            id: "3.0",
            label: "闻",
            size: [25, 30],
          },
          {
            id: "4.0",
            label: "切",
            size: [25, 30],
          },
        ],
        edges: [
          {
            source: "0",
            target: "1.0",
          },
          {
            source: "0",
            target: "2.0",
          },
          {
            source: "0",
            target: "3.0",
          },
          {
            source: "0",
            target: "4.0",
          },
        ],
      },
      correctmap: "",
      caseId: "",
      examNo: "",
      askData: [],
      watchData: [],
      listenData: [],
      feelData: [],
    };
  },
  mounted() {
    /*eslint-disable*/
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    let max = 100;
    let correct = document.getElementById("correct");
    window.addEventListener("mousewheel", (e) => {
      if (e.wheelDelta > 0) {
        // if (max == 100) {
        //   return;
        // }
        max += 10;
      } else {
        if (max == 30) {
          return;
        }
        max += -10;
      }
      correct.childNodes[0].style.height = (700 * max) / 100 + "px";
      correct.childNodes[0].style.width = (1400 * max) / 100 + "px";
    });
    this.correctmap = new G6.Graph({
      container: "correct",
      width: 1420,
      height: 700,
      modes: {
        default: ["drag-canvas", "drag-node"],
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        nodesep: 1,
        ranksep: 50,
      },

      defaultNode: {
        labelCfg: {
          style: {
            fill: "#fff",
          },
        },
        style: {
          fill: "rgb(5,60,118)",
          stroke: "#097ca8 ",
          lineWidth: 1,
          radius: 5,
        },
        type: "rect",
      },
      defaultEdge: {
        size: 1,
        color: "rgb(5,60,118)",
        style: {
          endArrow: {
            path: "M 4,0 L -4,-4 L -4,4 Z",
            d: 4,
          },
        },
      },
    });
    setTimeout(() => {
      this.correctmap.render();
      this.correctmap.changeData(this.mapData);
    }, 4000);
  },
  methods: {
    getcorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`)
        .then((res) => {
          let name = res.data.diseaseName;
          let nameId = res.data.diseaseNameId;
          let diseaseNameIssues = res.data.diseaseNameIssues;
          let diseases = res.data.diseases;
          let ask, watch, listen, feel;
          diseaseNameIssues.forEach((ele) => {
            if (ele.stageId == "1") {
              ask = ele;
            }
            if (ele.stageId == "2") {
              watch = ele;
            }
            if (ele.stageId == "3") {
              listen = ele;
            }
            if (ele.stageId == "4") {
              feel = ele;
            }
          });
          this.checkAsk(name, nameId + 0.5, ask, diseases);
          this.checkWatch(nameId + 0.5, watch, diseases);
          this.checkListen(nameId + 0.5, listen, diseases);
          this.checkFeel(nameId + 0.5, feel, diseases);
          this.checkEdges(name, nameId + 0.5, diseaseNameIssues, diseases);
          this.gettreat(nameId + 0.5, diseases);
        });
    },
    gettreat(nameId, diseases) {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/treat/correct`)
        .then((res) => {
          let agentias = res.data.agentias;
          let id = res.data.agentias[0].id + 0.5;
          let treat = [];
          agentias[0].druggeries.forEach((ele, index) => {
            treat.push(ele.name);
            if (index == agentias[0].druggeries.length - 1) {
              this.mapData.nodes.push({
                id: id.toString(),
                label: `${res.data.treatName + agentias[0].name + treat}`,
              });
              diseases.forEach((ele) => {
                this.mapData.edges.push({
                  source: (ele.id + 0.5).toString(),
                  target: id.toString(),
                });
              });
              this.mapData.edges.push({
                source: nameId.toString(),
                target: id.toString(),
              });
            }
          });
        });
    },
    checkAsk(name, nameId, namelist, diseaselist) {
      let asklist = [namelist.issueIds];
      if (diseaselist.length > 1) {
        diseaselist.forEach((ele) => {
          ele.issues.forEach((item) => {
            if (item.stageId == "1") {
              asklist.push(item.issueIds);
            }
          });
        });
      }
      asklist = [].concat(...asklist);
      asklist = new Set(asklist);
      // 获取 病名 各项病症 问诊
      this.askData.forEach((ele) => {
        asklist.forEach((item) => {
          if (item == ele.id) {
            let width = ele.question.length + ele.answer.length;
            let nodes = {
              id: item.toString(),
              label: `问:${ele.question} 答:${ele.answer}`,
              size: [(width + 3) * 13, 30],
            };
            let edges = {
              source: "1.0",
              target: item.toString(),
            };
            this.mapData.nodes.push(nodes);
            this.mapData.edges.push(edges);
          }
        });
      });
    },
    checkWatch(nameId, watch, disease) {
      //获取望诊各项
      let watchList = JSON.parse(JSON.stringify(watch.issueIds));
      disease.forEach((ele) => {
        ele.issues.forEach((item) => {
          if (item.stageId == "2") {
            watchList.push(item.issueIds);
          }
        });
      });
      watchList = [].concat(...watchList);
      watchList = new Set(watchList);
      watchList.forEach((ele) => {
        this.watchData.forEach((item) => {
          if (ele == item.id) {
            //望诊>=望诊各项
            let nodes = {
              id: `${ele}`,
              label: `${item.name}--${item.correctAnswer}`,
            };
            let edges = {
              source: "2.0",
              target: ele.toString(),
            };
            this.mapData.nodes.push(nodes);
            this.mapData.edges.push(edges);
          }
        });
      });
    },
    checkListen(nameId, listen, disease) {
      let listenList = JSON.parse(JSON.stringify(listen.issueIds));
      disease.forEach((ele) => {
        ele.issues.forEach((item) => {
          if (item.stageId == "3") {
            item.issueIds.forEach((e) => {
              listenList.push(e);
            });
          }
        });
      });
      listenList = new Set(listenList);
      listenList.forEach((ele) => {
        this.listenData.forEach((item) => {
          if (item.id == ele) {
            let nodes = {
              id: `${ele}`,
              label: `${item.name}--${item.correctAnswer}`,
            };
            let edges = {
              source: "3.0",
              target: ele.toString(),
            };
            this.mapData.nodes.push(nodes);
            this.mapData.edges.push(edges);
          }
        });
      });
    },
    checkFeel(nameId, feel, disease) {
      let feelList = JSON.parse(JSON.stringify(feel.issueIds));
      disease.forEach((ele) => {
        ele.issues.forEach((item) => {
          if (item.stageId == "4") {
            item.issueIds.forEach((e) => {
              feelList.push(e);
            });
          }
        });
      });
      feelList = new Set(feelList);
      this.feelData = [].concat(...this.feelData);
      feelList.forEach((ele) => {
        this.feelData.forEach((item) => {
          if (ele == item.id) {
            let nodes = {
              id: ele.toString(),
              label: `${item.name ? item.name : "切诊"}--${item.correctAnswer}`,
            };
            let edges = {
              source: "4.0",
              target: ele.toString(),
            };
            this.mapData.edges.push(edges);
            this.mapData.nodes.push(nodes);
          }
        });
      });
    },
    checkEdges(name, nameId, diseaseNameIssues, diseases) {
      //添加病名
      this.mapData.nodes.push({
        id: nameId.toString(),
        label: name.toString(),
      });
      //添加病症
      diseases.forEach((ele) => {
        this.mapData.nodes.push({
          id: (ele.id + 0.5).toString(),
          label: ele.name.toString(),
        });
        ele.issues.forEach((item) => {
          item.issueIds.forEach((e) => {
            this.mapData.edges.push({
              source: e.toString(),
              target: (ele.id + 0.5).toString(),
            });
          });
        });
      });
      //四诊=>病名
      diseaseNameIssues.forEach((ele) => {
        ele.issueIds.forEach((item) => {
          this.mapData.edges.push({
            source: item.toString(),
            target: nameId.toString(),
          });
        });
      });
    },
  },
  watch: {
    ask: function () {
      this.askData = this.ask;
      this.getcorrect();
    },
    watch: function () {
      this.watchData = this.watch;
    },
    listen: function () {
      this.listenData = this.listen;
    },
    press: function () {
      this.feelData.push(this.press);
    },
    pulse: function () {
      this.feelData.push(this.pulse);
    },
  },
};
</script>

<style lang="scss">
#correct {
  position: relative;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>