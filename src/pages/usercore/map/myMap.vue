<template>
  <div id="mountNode"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "my-map",
  mounted() {
    var data = {
      nodes: [
        {
          id: "0",
          label: "马月梅",
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
        {
          id: "5",
          label: "5",
        },
        {
          id: "6",
          label: "6",
        },
        {
          id: "7",
          label: "7",
        },
        {
          id: "8",
          label: "8",
        },
        {
          id: "9",
          label: "9",
        },
        {
          id: "10",
          label: "10",
        },
        {
          id: "11",
          label: "11",
        },
        {
          id: "12",
          label: "12",
        },
        {
          id: "13",
          label: "病名",
        },
        {
          id: "14",
          label: "病症1",
        },
        {
          id: "15",
          label: "病症2",
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
        {
          source: "1",
          target: "5",
        },
        {
          source: "1",
          target: "6",
        },
        {
          source: "1",
          target: "7",
        },
        {
          source: "1",
          target: "8",
        },
        {
          source: "1",
          target: "9",
        },
        {
          source: "1",
          target: "10",
        },
        {
          source: "1",
          target: "11",
        },
        {
          source: "1",
          target: "12",
        },
        {
          source: "5",
          target: "13",
        },
        {
          source: "11",
          target: "13",
        },
        {
          source: "12",
          target: "13",
        },
        {
          source: "6",
          target: "14",
        },
        {
          source: "8",
          target: "14",
        },
        {
          source: "10",
          target: "14",
        },
        {
          source: "5",
          target: "15",
        },
        {
          source: "7",
          target: "15",
        },
        {
          source: "9",
          target: "15",
        },
        {
          source: "6",
          target: "15",
        },
      ],
    };
    var graph = new G6.Graph({
      container: "mountNode",
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
        size: [40, 20],
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
    graph.data(data);
    graph.render();
  },
};
</script>