<template>
  <div id="correct"></div>
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
            id: "1",
            label: "问",
          },
          {
            id: "2",
            label: "望",
          },
          {
            id: "3",
            label: "闻",
          },
          {
            id: "4",
            label: "切",
          },
        ],
        edges: [
          {
            source: "0",
            target: "1",
          },
          {
            source: "0",
            target: "2",
          },
          {
            source: "0",
            target: "3",
          },
          {
            source: "0",
            target: "4",
          },
        ],
      },
      correctmap: "",
      caseId: "",
      examNo: "",
      // diseaseAsk: [],
      askData: [],
      // diseaseWatch: [],
      watchData: [],
      // diseaseListen: [],
      // listenData: [],
      // listen: [],
      // diseasePress: [],
      // pressData: [],
      // press: [],
      // diseasePulse: [],
      // pulseData: [],
      // pulse: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.correctmap = new G6.Graph({
      container: "correct",
      width: window.innerWidth,
      height: window.innerHeight,
      modes: {
        default: ["drag-canvas", "drag-node"],
      },
      layout: {
        type: "dagre",
        nodeSize: [40, 20],
        align: "DL",
        rankdir: "LR",
        nodesep: 5,
        ranksep: 30,
      },
      animate: true,
      defaultNode: {
        size: [40, 30],
        color: "steelblue",
        type: "rect",
        style: {
          lineWidth: 2,
          fill: "#fff",
        },
      },
      defaultEdge: {
        size: 1,
        color: "#e2e2e2",
        style: {
          endArrow: {
            path: "M 4,0 L -4,-4 L -4,4 Z",
            d: 4,
          },
        },
      },
    });
  },
  methods: {
    /*eslint-disable*/
    getcorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`)
        .then((res) => {
          console.log(res);
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
          this.checkAsk(name, nameId, ask, diseases);
          this.checkWatch(nameId, watch, diseases);
        });
    },
    checkAsk(name, nameId, namelist, diseaselist) {
      let asklist = [namelist.issueIds];
      if (diseaselist.length > 1) {
        diseaselist.forEach((ele) => {
          ele.issues.forEach((item) => {
            if (item.stageId == "1") {
              asklist.push(item.issueIds);
              this.mapData.nodes.push({
                id: nameId.toString(),
                label: name.toString(),
              });
            }
          });
        });
      }
      asklist = [].concat(...asklist);
      asklist = new Set(asklist);
      // 获取 病名 各项病症 问诊
      this.askData.forEach((ele, index) => {
        asklist.forEach((item) => {
          if (item == ele.id) {
            let nodes = {
              id: item.toString(),
              label: `问:${ele.question} 答:${ele.answer}`,
            };
            let edges = {
              source: "1",
              target: item.toString(),
            };
            this.mapData.nodes.push(nodes);
            this.mapData.edges.push(edges);
          }
        });
      });
      //问诊连线病名
      namelist.issueIds.forEach((ele) => {
        let edges = {
          source: ele.toString(),
          target: nameId.toString(),
        };
        this.mapData.edges.push(edges);
      });
      // 问诊连线各项病症
      diseaselist.forEach((ele) => {
        let nodes = {
          id: ele.id.toString(),
          label: ele.name.toString(),
        };
        ele.issues.forEach((item) => {
          if (item.stageId == "1") {
            item.issueIds.forEach((e) => {
              let edges = {
                source: e.toString(),
                target: ele.id.toString(),
              };
              this.mapData.edges.push(edges);
            });
          }
        });
        this.mapData.nodes.push(nodes);
      });
    },
    checkWatch(nameId, watch, disease) {
      //获取望诊各项
      let watchList = watch.issueIds;
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
            let nodes = {
              id: ele.toString(),
              label: `${item.name}--${item.answer}`,
            };
            this.mapData.nodes.push(nodes);
          }
        });
        this.correctmap.render();
        this.correctmap.changeData(this.mapData);
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
  },
};
</script>