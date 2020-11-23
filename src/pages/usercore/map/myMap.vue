<template>
  <div id="mountNode"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "my-map",
  mounted() {
    const data = {
      nodes: [
        {
          id: "node6",
          groupId: "group3",
          label: "rect",
          x: 100,
          y: 300,
        },
        {
          id: "node1",
          label: "fck",
          groupId: "group1",
          x: 100,
          y: 100,
        },
        {
          id: "node9",
          label: "noGroup1",
          groupId: "p1",
          x: 300,
          y: 210,
        },
        {
          id: "node2",
          label: "node2",
          groupId: "group1",
          x: 150,
          y: 200,
        },
        {
          id: "node3",
          label: "node3",
          groupId: "group2",
          x: 300,
          y: 100,
        },
        {
          id: "node7",
          groupId: "p1",
          label: "node7-p1",
          x: 200,
          y: 200,
        },
        {
          id: "node10",
          label: "noGroup",
          groupId: "p2",
          x: 300,
          y: 210,
        },
      ],
      edges: [
        {
          source: "node1",
          target: "node2",
        },
        {
          source: "node2",
          target: "node3",
        },
      ],
      groups: [
        {
          id: "group1",
          title: {
            text: "第一个分组",
            stroke: "#444",
            offsetX: -30,
            offsetY: 30,
          },
          parentId: "p1",
        },
        // {
        //   id: "group2",
        //   parentId: "p1",
        // },
        // {
        //   id: "group3",
        //   parentId: "p2",
        // },
        // {
        //   id: "p1",
        // },
        // {
        //   id: "p2",
        // },
      ],
    };

    const graph = new G6.Graph({
      container: "mountNode",
      width: 800,
      height: 600,
      pixelRatio: 2,
      modes: {
        default: ["drag-canvas"],
      },
      defaultNode: {
        // shape: "circleNode",
      },
      defaultEdge: {
        color: "#bae7ff",
      },
    });

    graph.data(data);
    graph.render();
  },
};
</script>