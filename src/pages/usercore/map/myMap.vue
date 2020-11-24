<template>
  <div id="mymap"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "my-map",
  props: ["ask", "watch", "listen", "press", "pulse", "correct"],
  data() {
    return {
      mapData: {
        nodes: [
          {
            id: "0",
            label: ["范再娟"],
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
            color: "rgb(0,235,255)",
          },
          {
            source: "0",
            target: "2.0",
            color: "rgb(0,235,255)",
          },
          {
            source: "0",
            target: "3.0",
            color: "rgb(0,235,255)",
          },
          {
            source: "0",
            target: "4.0",
            color: "rgb(0,235,255)",
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
      disease: "",
      diseasename: "",
    };
  },
  /*eslint-disable*/
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getDisease();
    this.getdiseaseName();
    this.mytmap = new G6.Graph({
      container: "mymap",
      width: 1420,
      height: 700,
      modes: {
        default: ["drag-canvas", "drag-node", "zoom-canvas"],
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        nodesep: 1,
        ranksep: 35,
      },
      defaultNode: {
        size: [110, 30],
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
      },
    });
  },
  methods: {
    checkAnswer(correct) {
      //问诊
      let ask = [],
        diseaseask = [],
        watch = [],
        diseasewatch = [],
        listen = [],
        diseaselisten = [],
        feel = [],
        diseasefeel = [];
      this.disease.forEach((ele) => {
        ele.issueResults.forEach((item) => {
          if (item.stageId == "1") {
            ask.push(item.issues);
          }
          if (item.stageId == "2") {
            watch.push(item.issues);
          }
          if (item.stageId == "3") {
            listen.push(item.issues);
          }
          if (item.stageId == "4") {
            feel.push(item.issues);
          }
        });
      });

      this.diseasename.issueResults.forEach((ele) => {
        if (ele.stageId == "1") {
          diseaseask = ele.issues;
        }
        if (ele.stageId == "2") {
          diseasewatch = ele.issues;
        }
        if (ele.stageId == "3") {
          diseaselisten = ele.issues;
        }
        if (ele.stageId == "4") {
          diseasefeel = ele.issues;
        }
      });
      //问诊
      let askList = [];
      ask.forEach((ele) => {
        ele.forEach((item) => {
          askList.push(item.issueId);
        });
      });
      diseaseask.forEach((ele) => {
        askList.push(ele.issueId);
      });
      askList = new Set(askList);
      this.askData.forEach((ele) => {
        askList.forEach((item) => {
          if (ele.id == item) {
            let width = ele.question.length + ele.answer.length;
            this.mapData.nodes.push({
              id: ele.id.toString(),
              label: `问: ${ele.question} 答: ${ele.answer}`,
              size: [(width + 4) * 13, 30],
              // shape: "multipleLabelsNode",
              // name: "ask",
            });
          }
        });
      });

      //病名 及 症候
      this.mapData.nodes.push({
        id: "0.4",
        label: this.diseasename.answer.toString(),
        correct: this.diseasename.correct,
      });
      this.disease.forEach((ele) => {
        this.mapData.nodes.push({
          id: (ele.id + 0.5).toString(),
          label: ele.answer.toString(),
          correct: ele.correct,
        });
      });
      //链接

      this.mytmap.data(this.mapData);
      this.mytmap.render();
    },
    getDisease() {
      this.axios.get(`${this.examNo}/${this.caseId}/disease`).then((res) => {
        this.disease = res.data;
      });
    },
    getdiseaseName() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/diseasename`)
        .then((res) => {
          this.diseasename = res.data;
        });
    },
  },
  watch: {
    ask: function () {
      this.askData = this.ask;
      this.checkAnswer(this.correct);
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